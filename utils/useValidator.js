import React, { useCallback } from "react";

const setNestedObjectValues = (obj = {}, value) => {
  const mutatedObj = {};
  for (const k in obj) {
    mutatedObj[k] = value;
  }
  return mutatedObj;
};

export const createFakeEvent = (value) => ({
  target: { value: value },
  persist: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };
    case "SET_FIELD_VALUE":
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    case "SET_FIELD_TOUCHED":
      return {
        ...state,
        touched: {
          ...state.touched,
          ...action.payload,
        },
      };
    case "SET_VALUES":
      return {
        ...state,
        values: action.payload,
      };
    case "SUBMIT_ATTEMPT":
      return {
        ...state,
        isSubmitting: true,
        touched: setNestedObjectValues(state.values, true),
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
      };
    case "SUBMIT_FAILURE":
      return {
        ...state,
        isSubmitting: false,
        submitError: action.payload,
      };
    case "CLEAR_STATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const useValidator = (props) => {
  if (!props.onSubmit) {
    throw new Error("You forgot to pass onSubmit to useValidator!");
  }
  if (!props.validate && !props.validationSchema) {
    throw new Error(
      "You forgot to pass validate or validationSchema to useValidator!"
    );
  }

  const [state, dispatch] = React.useReducer(reducer, {
    values: props.initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  const validate = useCallback(
    (values) => {
      if (props.validate) {
        return props.validate(values);
      } else if (props.validationSchema) {
        try {
          props.validationSchema.validateSync(values, {
            abortEarly: false,
          });
        } catch (e) {
          const errors = {};
          if (Array.isArray(e.inner)) {
            for (const err of e.inner) {
              errors[err.path] = err.message;
            }
            return errors;
          }
          return errors;
        }
        return {};
      }
    },
    [props.validate, props.validationSchema]
  );

  React.useEffect(() => {
    if (props.validate || props.validationSchema) {
      const errors = validate(state.values);
      dispatch({ type: "SET_ERRORS", payload: errors });
    }
  }, [state.values]);

  const setValues = (values) =>
    dispatch({
      type: "SET_VALUES",
      payload: values,
    });

  const handleChange = (fieldName) => (event) => {
    event.persist();
    dispatch({
      type: "SET_FIELD_VALUE",
      payload: {
        [fieldName]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
    });
  };
  const clearFormState = () => {
    dispatch({
      type: "CLEAR_STATE",
      payload: {
        values: props.initialValues,
        errors: {},
        touched: {},
        isSubmitting: false,
      },
    });
  };

  const handleBlur = (fieldName) => (event) => {
    dispatch({
      type: "SET_FIELD_TOUCHED",
      payload: { [fieldName]: true },
    });
  };

  const getFieldProps = (fieldName) => ({
    value: state.values[fieldName] ?? "",
    onChange: handleChange(fieldName),
    onBlur: handleBlur(fieldName),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "SUBMIT_ATTEMPT" });
    const errors = validate(state.values);
    if (!Object.keys(errors).length) {
      try {
        await props.onSubmit(state.values);
        dispatch({ type: "SUBMIT_SUCCESS" });
      } catch (submitError) {
        dispatch({ type: "SUBMIT_FAILURE", payload: submitError });
      }
    } else {
      dispatch({ type: "SET_ERRORS", payload: errors });
      dispatch({ type: "SUBMIT_FAILURE" });
    }
  };
  return {
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    getFieldProps,
    clearFormState,
    ...state,
  };
};

export default useValidator;
