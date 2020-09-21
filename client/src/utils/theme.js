import api from './api'

export default {
    setCssColors: async function(subjectId) {
        let colorStandard, colorLight, colorDark
        switch (subjectId) {
            case "math": case 1: case "1":
                colorStandard = '#BA4040'
                colorLight = '#D66E6E'
                colorDark = '#BA0000'
                break
            case "science": case 2: case "2":
                colorStandard = '#CB815C'
                colorLight = '#DBA78D'
                colorDark = '#FD6A02'
                break
            case "humanities": case 3: case "3":
                colorStandard = '#6391C0'
                colorLight = '#92B2D3'
                colorDark = '#2784C7'
                break
            case "life skills": case 4: case "4": 
                colorStandard = '#6EA1A1'
                colorLight = '#92B8B9'
                colorDark = '#73A58E'
                break
            case "computer science": case 5: case "5": default: 
                colorStandard = '#7A7DCA'
                colorLight = '#A2A4DA'
                colorDark = '#786EC4'
                break
        }

        document.documentElement.style.setProperty(`--colorLight`, `${colorLight}`);
        document.documentElement.style.setProperty(`--colorStandard`, `${colorStandard}`);
        document.documentElement.style.setProperty(`--colorDark`, `${colorDark}`);
    },

    setCssColorsByCourseId: async function(courseId) {
        api.getCourse(courseId).then( course => {
            if (course && course.data && course.data.length != 0) {
                this.setCssColors(course.data[0].subject_id)
            }
        })
    }
}