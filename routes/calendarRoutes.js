import express from 'express'

import {
    getCalendarsOfUser,
    getCalendarById,
    createCalendar,
    addLegend,
    deleteCalendar,
    deleteLegend,
    addDay,
    deleteDay
} from '../controllers/calendarController.js'
import {getTokenFromRequest} from "../middleware/authMiddleware.js";
const router = express.Router()



router.route('/').get(getTokenFromRequest, getCalendarsOfUser)
router.route('/:id').get(getTokenFromRequest, getCalendarById)
router.route('/').post(getTokenFromRequest, createCalendar)
router.route('/:id/legend').put(getTokenFromRequest, addLegend)
router.route('/:id/day').put(getTokenFromRequest, addDay)
router.route('/:id').delete(getTokenFromRequest, deleteCalendar)
router.route('/:id/legend/:legend_id').delete(getTokenFromRequest, deleteLegend)
router.route('/:id/day/:day_id').delete(getTokenFromRequest,deleteDay)

export default router