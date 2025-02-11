import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    authors: [],
    posts: [],
    likes: [],
    comments: [],
    loading: false,
    error: null,
};

export const thunkFetchData = createAsyncThunk(
    "data/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const urls = [
                { key: "authors", url: "http://localhost:3000/authors" },
                { key: "posts", url: "http://localhost:3000/posts" },
                { key: "likes", url: "http://localhost:3000/likes" },
                { key: "comments", url: "http://localhost:3000/comments" },
            ];

            const responses = await Promise.all(urls.map(({ url }) => fetch(url)));

            responses.forEach((res, index) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch ${urls[index].key}: ${res.status} ${res.statusText}`);
                }
            });

            const data = await Promise.all(responses.map((res) => res.json()));

            return urls.reduce((acc, { key }, index) => {
                acc[key] = data[index] || [];
                return acc;
            }, {});
        } catch (error) {
            return rejectWithValue(error.message || "An unknown error occurred");
        }
    }
);

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(thunkFetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(thunkFetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.authors = action.payload?.authors || [];
                state.posts = action.payload?.posts || [];
                state.likes = action.payload?.likes || [];
                state.comments = action.payload?.comments || [];
            })
            .addCase(thunkFetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong while fetching data";
            });
    },
});

export const selectAuthors = createSelector(
  (state) => state.data.authors,
  (authors) => authors
);

export default dataSlice.reducer;