const axios = require('axios')
const mongoose = require('mongoose')
const db = require('./db')
const User = require('../models/User')
const Review = require('../models/Review')
const Comment = require('../models/Comment')
const Company = require('../models/Company')
const Rating = require('../models/Rating')
const MONGO_URL = process.env.MONGO_URL


const getInternCompassUserId = async () => {
    console.log('Creating new InternCompass account')
    const internCompassUser = new User({
        _id: new mongoose.Types.ObjectId(),
        createdAt: new Date(),
        username: 'InternCompass',
        password: 'raondom password delete later',
        email: 'InternCompass@test.com',
        institution: 'University of Waterloo',
        firstName: 'Intern',
        lastName: 'Compass',
        role: 'XINT'
    })
    internCompassUserId = await db(MONGO_URL, () => internCompassUser.save().then(doc => doc._id))

    return internCompassUserId
}

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
    return 0
}


const seed = async () => {

    console.log('Updating database with Intern Compass Reviews')

    console.log('Finding/creating InternCompass User')
    let uid = await getInternCompassUserId();

    // fetching interncompass data from github
    console.log('Fetching raw Intern Compass data...')
    const companyUrl = 'https://gist.githubusercontent.com/byan1197/daf84be4b1c83176f00ea838890bdccb/raw/c4cdaf13cc39f0f8106046b2326fb13b1e5edf54/company.json'
    const jobUrl = 'https://gist.githubusercontent.com/byan1197/daf84be4b1c83176f00ea838890bdccb/raw/c4cdaf13cc39f0f8106046b2326fb13b1e5edf54/job.json'
    const userReview = 'https://gist.githubusercontent.com/byan1197/daf84be4b1c83176f00ea838890bdccb/raw/c4cdaf13cc39f0f8106046b2326fb13b1e5edf54/user_review.json'

    let rawCompaniesJson = await axios.get(companyUrl).then(response => response.data)
    let rawJobsJson = await axios.get(jobUrl).then(response => response.data)
    let rawUserReviewJson = await axios.get(userReview).then(response => response.data)



    //preparing the interncompass data in map form
    let companiesJsonMap = {}
    let jobsJsonMap = {}

    rawCompaniesJson.forEach(c => {
        companiesJsonMap[c.id] = c
    })

    rawJobsJson.forEach(j => {
        jobsJsonMap[j.id] = j
    })

    let createdCompaniesMap = {}
    let companyObjBulk = [];
    let ratingObjBulk = [];
    let reviewObjBulk = []
    let companySaveResults = []
    let ratingSaveResults = []

    let ratingJsonToMongoMap = {}
    let companyJsonToMongoMap = {}


    rawUserReviewJson.forEach(ur => {

        let company = companiesJsonMap[ur.company_id]
        let job = jobsJsonMap[ur.job_id]

        if (company !== undefined && job !== undefined) {

            let ratingMongoose = new Rating({
                _id: new mongoose.Types.ObjectId(),
                culture: ur.work_life_balance_rating,
                mentorship: ur.mentorship_rating,
                impact: ur.meaningful_work_rating,
                interview: null,
            })

            ratingJsonToMongoMap[ur.id] = ratingMongoose

            let companyMongoose = new Company({
                _id: new mongoose.Types.ObjectId(),
                name: company.name,
                location: job.location,
                logo: company.logo_url || 'none',
            })

            companyJsonToMongoMap[company.name + job.location] = companyMongoose
        }

    })

    ratingObjBulk = Object.keys(ratingJsonToMongoMap).map(id => ratingJsonToMongoMap[id])
    companyObjBulk = Object.keys(companyJsonToMongoMap).map(id => companyJsonToMongoMap[id])

    companySaveResults = await db(MONGO_URL, () => Company.collection.insertMany(companyObjBulk, { rawResult: true }).then(docs => docs.ops))
    ratingSaveResults = await db(MONGO_URL, () => Rating.collection.insertMany(ratingObjBulk, { rawResult: true }).then(docs => docs.ops))

    // preparing the saved results in a map
    companySaveResults.forEach(c => {
        createdCompaniesMap[c.id] = c._id
    })

    rawUserReviewJson.forEach(ur => {

        let company = companiesJsonMap[ur.company_id]
        let job = jobsJsonMap[ur.job_id]

        reviewObjBulk.push(new Review({
            _id: new mongoose.Types.ObjectId(),
            salary: job.avg_salary_in_cents,
            content: ur.description,
            rating: ratingJsonToMongoMap[ur.id]._id,
            position: job.title,
            user: uid,
            company: companyJsonToMongoMap[company.name + job.location]._id,
            upvotes: [],
            downvotes: [],
            comments: [],
            id: ur.id
        }))
    })

    try {
        let savedReviews = await db(MONGO_URL, () => Review.collection.insertMany(reviewObjBulk, { rawResult: true }).then(reviews => reviews.ops))

        console.log('Saving complete.')
        console.log(companySaveResults.length, ' Company objects created.')
        console.log(ratingSaveResults.length, ' Rating objects created.')
        console.log(savedReviews.length, ' Review objects created.')
        console.log('Exiting')

    } catch (e) {
        console.log('An error has occurred trying to save everything')
        console.log(e)
        console.log('Exiting')
    }


}

seed()