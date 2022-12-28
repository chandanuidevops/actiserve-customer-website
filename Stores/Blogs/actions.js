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

} from './constants';



export const getBlogsListing = (payload) => ({
  type: GET_BLOGS_LISTING,
  payload,
});
export const getBlogsListingSuccess = (payload) => ({
  type: GET_BLOGS_LISTING_SUCCESS,
  payload,
});
export const getBlogsListingFailure = (payload) => ({
  type: GET_BLOGS_LISTING_FAILURE,
  payload,
});
export const getLatestBlogs = (payload) => ({
  type: GET_LATEST_BLOGS,
  payload,
});
export const getLatestBlogsSuccess = (payload) => ({
  type: GET_LATEST_BLOGS_SUCCESS,
  payload,
});
export const getLatestBlogsFailure = (payload) => ({
  type: GET_LATEST_BLOGS_FAILURE,
  payload,
});


export const getSingleBlog = (payload) => ({
  type: GET_SINGLE_BLOGS,
  payload,
});
export const getSingleBlogSuccess = (payload) => ({
  type: GET_SINGLE_BLOGS_SUCCESS,
  payload,
});
export const getSingleBlogFailure = (payload) => ({
  type: GET_SINGLE_BLOGS_FAILURE,
  payload,
});







