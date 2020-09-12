const ChapterModel = require('../models/ChapterModel')
const CourseModel = require('../models/CourseModel')

/**
 * Return a list of courses associated with a particular courseId
 * @param {Integer} courseId 
 */
const getChaptersByCourseId = async (courseId) => {
    if (parseInt(courseId)) {
        return ChapterModel.getChaptersByCourseId(courseId)
    }
    else {
        throw new Error (`courseId must be an integer: given ${courseId}`)
    }
}

/**
 * Create a new chapter 
 * @param {Integer} courseId 
 * @param {*} chapterName 
 * @param {*} sequence 
 * @param {String} description 
 */
const createChapter = async(courseId, chapterName, sequence=null, description) => {
    // check that courseId is a number 
    if (Number.isInteger(courseId) == NaN) {
        throw new Error("'courseId' must be an integer")
    } else if (sequence != null && parseInt(sequence) == NaN) {
        throw new Error("'sequence' must be an integer")
    }

    courseId = parseInt(courseId)

    // validate courseId exists and chapter isn't a duplicate
    let [course, chapter] = await Promise.all(
        [CourseModel.getCourse(courseId), ChapterModel.getChapter(chapterName)])
    if (course.length == 0) {
        throw new Error(`Could not find course with courseId ${courseId}`)
    } else if (chapter.length != 0) {
        throw new Error(`Chapter with name ${chapterName} already exists!`)
    }

    return ChapterModel.createChapter(course[0].subject_id, courseId, chapterName, sequence, description)
}

module.exports = {
    getChaptersByCourseId: getChaptersByCourseId,
    createChapter: createChapter
}