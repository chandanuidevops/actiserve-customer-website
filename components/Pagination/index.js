import React from 'react'
import PropTypes from 'prop-types'
import {StyledPagination} from './styles'

export default function Pagination({count, page, onPager, ...rest}) {
  const onChange = (type, newPage) => {
    if (page !== newPage) {
      onPager(newPage)
    }
  }
  console.log('page>',page)

  return (
    <StyledPagination
      count={count}
      variant="text"
      color="primary"
      page={page}
      selected={true}
      onChange={onChange}
      showFirstButton
      showLastButton
      {...rest}
    />
  )
}

Pagination.propTypes = {
  count: PropTypes.number,
  onPager: PropTypes.func,
}
