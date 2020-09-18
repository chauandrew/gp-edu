const LessonModel = require('../models/LessonModel')
const ChapterModel = require('../models/ChapterModel')
const UserProgressModel = require('../models/UserProgressModel')
const UserModel = require('../models/UserModel')

/**
 * @param {Integer} chapterId 
 * @param {Integer} lessonNum 
 * @param {String} contentUrl 
 * @param {String} description 
 */
const createLesson = async (chapterId, courseId, lessonName, lessonNum=null, contentUrl, description) => {
    if (chapterId && Number.isInteger(chapterId) == NaN) {
        throw new Error(`'chapterId' must be an integer, not ${chapterId}`)
    } else if (parseInt(courseId) == NaN) {
        throw new Error(`'courseId' must be an integer, not ${courseId}`)
    } else if (!lessonName || lessonName.length > 63) {
        throw new Error("'lessonName' must be specified and less than 63 characters")
    } else if (lessonNum != null && parseInt(lessonNum) == NaN) {
        throw new Error("'lessonNum' must be an integer")
    } else if (!contentUrl || contentUrl.length > 255) {
        throw new Error("'contentUrl' must be specified and less than 255 characters")
    } else if (!description || description.length > 255) {
        throw new Error("'description' must be specified and less than 255 characters")
    }
    
    chapterId = chapterId ? parseInt(chapterId) : null
    courseId = parseInt(courseId)

    // validate chapter exists
    if (chapterId) {
        let chapter = await ChapterModel.getChapter(chapterId);
        if (chapter.length == 0) {
            throw new Error (`Could not find chapter with chapterId ${chapterId}`)
        }
    }
    
    return LessonModel.createLesson(chapterId, courseId, lessonName, 
        lessonNum, contentUrl, description)
}

/**
 * Get lessons in the same chapter as the given lesson
 * @param {Integer} lessonId 
 */
const getRelatedLessons = async (lessonId) => {
    if (!parseInt(lessonId)) {
        throw new Error(`lessonId must be an integer: received ${lessonId}`)
    }
    lessonId = parseInt(lessonId)
    return LessonModel.getRelatedLessons(lessonId)
}

/**
 * Return all of a user's lesson progress
 * @param {Integer} uid 
 */
const getLessonProgress = async (uid) => {
    user = await UserModel.getUserByUid(uid)
    return LessonModel.getLessonProgress(user.id)
}

/**
 * Insert or update a user progress record
 * @param {String} uid
 * @param {Integer} lessonId 
 * @param {Integer} statusId status type from user_progress_status table
 */
const upsertUserProgress = async (uid, lessonId, statusId) => {
    if (!parseInt(lessonId)) {
        throw new Error(`lessonId must be an integer: received ${lessonId}`)
    } else if (!parseInt(statusId)) {
        throw new Error(`statusId must be an integer: received ${statusId}`)
    }

    // check that uid, lessonId, and statusId are all valid. 
    // Also, get appropriate user/course/chapter ids from the lesson.
    let [user, lesson, status] = await Promise.all([
        UserModel.getUserByUid(uid),
        LessonModel.getLessonById(lessonId), 
        UserProgressModel.getUserProgressStatus(statusId)
    ])
    
    if (!user) {
        throw new Error(`User with uid ${uid} doesn't exist`)
    } else if (!lesson) {
        throw new Error(`Lesson with id ${lessonId} doesn't exist`)
    } else if (!status) {
        throw new Error(`user_progress_status with id ${statusId} doesn't exist!`)
    }

    return LessonModel.upsertUserProgress(user.id, lesson.course_id, 
        lesson.chapter_id, lessonId, statusId)
}

module.exports = {
    createLesson: createLesson,
    getRelatedLessons: getRelatedLessons,
    getLessonProgress: getLessonProgress,
    upsertUserProgress: upsertUserProgress
}