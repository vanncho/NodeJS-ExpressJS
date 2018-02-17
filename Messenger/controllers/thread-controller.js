const Thread = require('../models/Thread');
const User = require('../models/User');
const Message = require('../models/Message');
const messageChecker = require('../util/utility');

module.exports = {

    chatRoom: {
        get: (req, res) => {

            let currentUser = req.user.username;
            let otherUser = req.params.username;

            User.findOne({username: otherUser}).then((secondUser) => {

                if (!secondUser) {
                    return res.redirect('/?error=User no longer exists');
                }

                if (!secondUser.blockedUsers) {

                    secondUser.blockedUsers = [];
                    secondUser.save();

                } else {
                    if (secondUser.blockedUsers.indexOf(req.user._id) !== -1) {
                        data.blocked = true
                    }
                }
            });

            Thread.findOne({users: { $all:[currentUser, otherUser] }}).then((currentThread) => {

                if (!currentThread) {
                    return res.redirect('/?error=Thread no longer exists');
                }

                let data = { currentThread };

                Message.find({thread: currentThread._id})
                    .sort({dateCreated: 1})
                    .populate('user')
                    .then((messages) => {

                        for (let msg of messages) {
                            if (messageChecker.isLink(msg.content)) {
                                msg.isLink = true;
                            }
                            if (messageChecker.isImage(msg.content)) {
                                msg.isImage = true;
                            }
                        }

                        data.messages = messages;
                    res.render('thread/chat-room', data);
                })
            });
        },
        post: (req, res) => {

            let currentUser = req.user.username;
            let otherUser = req.params.username;
            let content = req.body.content;

            Thread.findOne({users: { $all:[currentUser, otherUser] }}).then((currentThread) => {

                let messageData = {
                    thread: currentThread._id,
                    user: req.user._id,
                    content: content
                };

                Message.create(messageData).then((m) => {

                    res.redirect(`/thread/${otherUser}`);
                }).catch(err => {

                    res.redirect(`/thread/${otherUser}?error=${err.errors.content.message}`);
                })
            });
        }
    }
};