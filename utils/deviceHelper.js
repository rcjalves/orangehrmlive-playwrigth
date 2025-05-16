module.exports = {
  isMobile: (testInfo) => {
    return testInfo.project.name.includes('iPhone') ||
           testInfo.project.name.includes('Pixel') ||
           testInfo.project.name.includes('Android');
  }
};