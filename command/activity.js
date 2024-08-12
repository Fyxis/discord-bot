const moment = require('moment')
const { EmbedBuilder } = require('discord.js')

const listActivity = [
    { name: "wake up", time: "08.00" },
    { name: "take a bath", time: "08.15" },
    { name: "eat", time: "08.45" },
    { name: "productivity", time: "09.00" },
    { name: "lunch and break", time: "11.30" },
    { name: "productivity", time: "12.30" },
    { name: "break", time: "15.00" },
    { name: "take a bath", time: "17.00" },
    { name: "play a game", time: "17.30" },
    { name: "dinner", time: "20.00" },
    { name: "play a game", time: "20.30" },
    { name: "break and ready to sleep", time: "22.30" },
    { name: "sleep", time: "23.00" },
]

const activity = async (message) => {
    moment.locale('id')
    const currentTime = moment().format('HH.mm')
    const parseToString = String(currentTime)
    const getActivity = () => {
        const findActivityBefore = listActivity.find(activity => {
            return moment(activity.time, 'HH.mm').isAfter(moment(parseToString, 'HH.mm'))
        })
        const findIndexOf = listActivity.findIndex(activity => activity.name === findActivityBefore.name)
        const findActivity = listActivity[findIndexOf-1]
        return findActivity
    }

    const getEndTime = () => {
        const findActivityBefore = listActivity.find(activity => {
            return moment(activity.time, 'HH.mm').isAfter(moment(parseToString, 'HH.mm'))
        })
        const findIndexOf = listActivity.findIndex(activity => activity.name === findActivityBefore.name)
        const findActivity = listActivity[findIndexOf]
        return findActivity
    }
    const embed = new EmbedBuilder()
    .setTitle(getActivity().name.charAt(0).toUpperCase() + getActivity().name.slice(1))
    .setDescription(`I suggest you to ${getActivity().name}`)
    .addFields(
        { name: "Start time", value: getActivity().time },
        { name: "End time", value: getEndTime().time }
    );

    message.reply({ embeds: [embed] })
}

module.exports = activity