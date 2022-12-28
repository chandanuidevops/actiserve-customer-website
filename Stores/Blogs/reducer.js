import produce from 'immer'

import {
  GET_BLOGS_LISTING,
  GET_BLOGS_LISTING_SUCCESS,
  GET_BLOGS_LISTING_FAILURE,

  GET_LATEST_BLOGS,
  GET_LATEST_BLOGS_SUCCESS,
  GET_LATEST_BLOGS_FAILURE,

  GET_SINGLE_BLOGS,
  GET_SINGLE_BLOGS_SUCCESS,
  GET_SINGLE_BLOGS_FAILURE,
} from './constants'

export const initialState = {
  isFetchingBlogs: false,
  blogs: {},
  isFetchingLatestBlogs:false,
  latestBlogs:[],
  isFetchingSingleBlog: false,
  currentBlog:{}
}

const BlogsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_BLOGS_LISTING:
        draft.isFetchingBlogs = true
        break
      case GET_BLOGS_LISTING_SUCCESS:
        draft.isFetchingBlogs = false
        draft.blogs = action.payload
        break
      case GET_BLOGS_LISTING_FAILURE:
        draft.isFetchingBlogs = false

        break



        case GET_LATEST_BLOGS:
        draft.isFetchingLatestBlogs = true
        break
      case GET_LATEST_BLOGS_SUCCESS:
        draft.isFetchingLatestBlogs = false
        draft.latestBlogs = action.payload.data
        break
      case GET_LATEST_BLOGS_FAILURE:
        draft.isFetchingLatestBlogs = false

        break

        

        case GET_SINGLE_BLOGS:
        draft.isFetchingSingleBlog = true
        break
      case GET_SINGLE_BLOGS_SUCCESS:
        draft.isFetchingSingleBlog = false
        draft.currentBlog = action.payload
        break
      case GET_SINGLE_BLOGS_FAILURE:
        draft.isFetchingSingleBlog = false

        break

      default:
        return state
    }
  })
export default BlogsReducer
