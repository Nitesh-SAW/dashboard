import { createSlice } from "@reduxjs/toolkit";

const fisherYatesAlgo = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

const initialState = {
    selectedItems: [
        {
            id: 0,
            name: "All",
            items: [],
        },
        {
            id: 1,
            name: "Home",
            items: [
                { id: 101, image: "/Home.png" },
                { id: 102, image: "/homeslider.png" },
                { id: 103, image: "/home1.png" },
                { id: 104, image: "/testimonial.png" },
                { id: 105, image: "/Insights.png" },
                { id: 106, image: "/banner.png" }
            ]
        },
        {
            id: 2,
            name: "About",
            items: [
                { id: 203, image: "/home1.png" },
                { id: 204, image: "/testimonial.png" },
            ]
        },
        {
            id: 3,
            name: "Contact",
            items: [
                { id: 301, image: "/Home.png" },
                { id: 302, image: "/homeslider.png" },
                { id: 303, image: "/home1.png" },
            ]
        },
        {
            id: 4,
            name: "Album",
            items: [
                { id: 401, image: "/Home.png" },
                { id: 402, image: "/homeslider.png" },
            ]
        },
        {
            id: 5,
            name: "Search",
            items: [
                { id: 501, image: "/Home.png" },
            ]
        },
    ],
    filteredItems: [],
    selectedImage: []
}

const filterSlice = createSlice({
    name: 'Filter',
    initialState,
    reducers: {
        filterByName: (state, action) => {
            if (action.payload === "All") {
                const allImages = state.selectedItems.flatMap(item => item.items);
                state.filteredItems = fisherYatesAlgo(allImages)
            } else {
                const category = state.selectedItems.find((item) =>
                    item.name === action.payload);
                state.filteredItems = category ? category.items : [];
            }
        },

        setSelectedImage: (state, action) => {
            const image = action.payload
            state.selectedImage.push(image);
        },

        reorderImages: (state, action) => {
            const { sourceIndex, destinationIndex } = action.payload;

            const [removed] = state.selectedImage.splice(sourceIndex, 1);
            state.selectedImage.splice(destinationIndex, 0, removed);
        },

        removeSelectedImage: (state, action) => {

            const newArray = action.payload
            console.log(newArray);

            const filterIndex = state.selectedImage.filter(
                (_, index) =>
                    index !== newArray
            );
            state.selectedImage = filterIndex
        }


    }

})

export const { filterByName, setSelectedImage, reorderImages, removeSelectedImage } = filterSlice.actions;
export default filterSlice.reducer;