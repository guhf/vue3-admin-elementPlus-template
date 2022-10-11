interface LayoutSettings {
    // Controls settings panel display
    showSettings: boolean
    // Controls tagsview display
    showTagsView: boolean
    // Controls siderbar logo display
    showSidebarLogo: boolean
    // If true, will fix the header component
    fixedHeader: boolean
    // If true, will change active text color for sidebar based on theme
    sidebarTextTheme: boolean
  }

const layoutSettings: LayoutSettings = {
  showSettings: true,
  showTagsView: true,
  fixedHeader: true,
  showSidebarLogo: true,
  sidebarTextTheme: true
}

export default layoutSettings
