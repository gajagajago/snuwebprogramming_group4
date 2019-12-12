import firebase from './firebase';

const db = firebase.firestore();
const getScheduleByMonth = async (uid, date) => {
  const start = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-1`);
  const end = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-31`);
  const result = await db.collection('schedule')
  .where('date', '>=', start)
  .where('date', '<=', end)
  .where('uid', '==', uid)
  .get();
  return result.docs.map(element => element.data());
}

const getScheduleByDate = async (uid, date) => {
  const result = await db.collection('schedule')
  .where('date', '==', date)
  .where('uid', '==', uid)
  .get();
  return result.docs.map(element => element.data());
}

const addSchedule = async (uid, date, content) => {
  await db.collection('schedule').add({
    uid,
    date,
    content,
  });
}

export default {
  getScheduleByMonth,
  getScheduleByDate,
  addSchedule
}