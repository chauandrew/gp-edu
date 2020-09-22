import api from './api'

export default {
    /**
     * Set css theme color variables based on the subjectId
     * @param {*} subjectId integer OR all lowercase subject name
     */
    setCssColors: async function (subjectId) {
        let colorStandard, colorLight, colorLighter, colorDark, colorDarker
        switch (subjectId) {
            case "math": case 1: case "1":
                // Red
                colorLighter = '#FFF5F5'
                colorLight = '#FEB2B2'
                colorStandard = '#F56565'
                colorDark = '#C53030'
                colorDarker = '#742A2A'
                break
            case "science": case 2: case "2":
                // Orange
                colorLighter = '#FFFAF0'
                colorLight = '#FBD38D'
                colorStandard = '#ED8936'
                colorDark = '#C05621'
                colorDarker = '#7B341E'
                break
            case "humanities": case 3: case "3":
                // Blue
                colorLighter = '#EBF8FF'
                colorLight = '#90CDF4'
                colorStandard = '#4299E1'
                colorDark = '#2B6CB0'
                colorDarker = '#2A4365'
                break
            case "life skills": case 4: case "4":
                // Green
                colorLighter = '#F0FFF4'
                colorLight = '#9AE6B4'
                colorStandard = '#48BB78'
                colorDark = '#2F855A'
                colorDarker = '#22543D'
                break
            case "computer science": case 5: case "5": default:
                // Purple
                colorLighter = '#FAF5FF'
                colorLight = '#D6BCFA'
                colorStandard = '#9F7AEA'
                colorDark = '#6B46C1'
                colorDarker = '#44337A'
                break
        }

        document.documentElement.style.setProperty(`--colorLighter`, `${colorLighter}`);
        document.documentElement.style.setProperty(`--colorLight`, `${colorLight}`);
        document.documentElement.style.setProperty(`--colorStandard`, `${colorStandard}`);
        document.documentElement.style.setProperty(`--colorDark`, `${colorDark}`);
        document.documentElement.style.setProperty(`--colorDarker`, `${colorDarker}`);
    },

    /**
     * Set css theme color variables based on courseId
     * @param {Integer} courseId 
     */
    setCssColorsByCourseId: async function (courseId) {
        api.getCourse(courseId).then(course => {
            if (course && course.data && course.data.length != 0) {
                this.setCssColors(course.data[0].subject_id)
            }
        })
    },

}