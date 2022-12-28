/* eslint-disable react/prop-types */
import { Box, Card, Typography, withStyles } from "@material-ui/core";
import React from "react";

export const StyledCard = withStyles({
  root: {
    display: "flex",
    padding: "1.5rem",
    background: "#fff",
    boxShadow:
      "0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)",
    borderRadius: "4px",
    marginBottom: "2em",
    flexWrap: "wrap",
    alignItems: "flex-end",
    "& > div": {
      width: "calc(50% - 0.5rem)",
      "&:nth-child(odd)": {
        marginRight: "1rem",
      },
      "&:nth-child(n+3)": {
        marginTop: "1rem",
      },
    },
  },
})(Card);

const CardSection = ({
  cardSectionHeaderProps = {},
  CardSectionHeader,
  CardSectionHeaderIcons,
  cardProps = {},
  children,
  ...props
}) => (
  <Box display="flex" flexDirection="column">
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb="0.5rem"
      px="0.75rem"
      {...cardSectionHeaderProps}
    >
      <Typography variant="h4" style={{ fontWeight: 700 }}>
        {CardSectionHeader}
      </Typography>
      {CardSectionHeaderIcons ?? ""}
    </Box>
    <StyledCard elevation={0} {...cardProps}>
      {children}
    </StyledCard>
  </Box>
);
export default CardSection;
