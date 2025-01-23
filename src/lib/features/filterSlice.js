import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fisherYatesAlgo = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export const fetchComponentsBySlug = createAsyncThunk(
    'filter/fetchFilters', async (slug, { rejectWithValue }) => {
       
        try {
            const response = await fetch(
                "http://localhost:3005/api/get-page",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ slug }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch filters");
            }

            const data = await response.json();
            console.log(data);
            return data; 
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.message)
        }
    }
)

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
                { id: 201, image: "/Home.png" },
                { id: 202, image: "/homeslider.png" },
                { id: 203, image: "/home1.png" },
                { id: 204, image: "/testimonial.png" },
                { id: 205, image: "/Insights.png" },
                { id: 206, image: "/banner.png" }
            ]
        },
        {
            id: 3,
            name: "Contact Us",
            items: []
        },
        {
            id: 4,
            name: "Services",
            items: [
                //Social media advertising
                { id: 301, image: "/services/Banner.png" },
                { id: 302, image: "/services/ResultsDrivenSocial.png" },
                { id: 303, image: "/services/AdvertisingonSocialMedia.png" },
                { id: 304, image: "/services/PaidSocialMedia.png" },
                { id: 305, image: "/services/WhyYourBusinessNeeds.png" },
                { id: 306, image: "/services/PPCAgencyThat.png" },
                { id: 307, image: "/services/SocialMediaPlatforms.png" },
                { id: 308, image: "/services/SocialMediaPlatformsforBusiness.png" },
                { id: 309, image: "/services/HowMuchDoesSocial.png" },
                { id: 310, image: "/services/SMAServices.png" },
                { id: 311, image: "/services/WhyChoose.png" },
                { id: 312, image: "/services/LetsConnect.png" }
                //PayPerClick(PPC)Marketing

            ]
        },
        {
            id: 5,
            name: "Our work",
            items: []
        },
        {
            id: 6,
            name: "Carriers",
            items: [
                { id: 501, image: "/Carriers/AvailableJobsChoose.png" },
                { id: 502, image: "/Carriers/WhyBreezeEnd.png" },
                { id: 503, image: "/Carriers/OurCulture.png" },
                { id: 504, image: "/Carriers/WhoArethe.png" },
                { id: 505, image: "/Carriers/MakeTheRight.png" },
                { id: 506, image: "/Carriers/DedicatedTeam.png" },
                { id: 507, image: "/Carriers/OurCandidateExperience.png" },
                { id: 508, image: "/Carriers/BreezeEndTechnologySignificant.png" },
                { id: 509, image: "/Carriers/JoinOurGlobalTeam.png" }
            ]
        },
    ],
    filteredItems: [],
    selectedImage: [],
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
            const { image, id } = action.payload
            state.selectedImage.push({ image, id });
        },

        reorderImages: (state, action) => {
            const { sourceIndex, destinationIndex } = action.payload;

            const [removed] = state.selectedImage.splice(sourceIndex, 1);
            state.selectedImage.splice(destinationIndex, 0, removed);
        },

        removeSelectedImage: (state, action) => {

            const newArray = action.payload
            console.log(newArray)

            const filterIndex = state.selectedImage.filter(
                (_, i) =>
                    i !== newArray
            );
            state.selectedImage = filterIndex
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComponentsBySlug.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchComponentsBySlug.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.components = action.payload;
            })
            .addCase(fetchComponentsBySlug.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
})

export const { filterByName, setSelectedImage, reorderImages, removeSelectedImage } = filterSlice.actions;
export default filterSlice.reducer;