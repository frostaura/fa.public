import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SiteContext = 'default' | 'careers' | 'investors';
export const siteSections = ['home', 'architecture', 'projects', 'careers', 'investors'] as const;
export type SectionId = (typeof siteSections)[number];

interface SiteState {
  activeCompany: string;
  activeSection: SectionId;
  context: SiteContext;
}

const initialState: SiteState = {
  activeCompany: 'consolidated',
  activeSection: 'home',
  context: 'default',
};

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setActiveCompany: (state, action: PayloadAction<string>) => {
      state.activeCompany = action.payload;
    },
    setActiveSection: (state, action: PayloadAction<SectionId>) => {
      state.activeSection = action.payload;
    },
    setContext: (state, action: PayloadAction<SiteContext>) => {
      state.context = action.payload;
    },
  },
});

export const { setActiveCompany, setActiveSection, setContext } = siteSlice.actions;
export default siteSlice.reducer;
