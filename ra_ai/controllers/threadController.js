var sequelize = require('../objects/sequelize.js');
var Thread = require('../models/thread.js');
var ThreadParticipant = require('../models/thread_participant.js');
var Message = require('../models/message.js');
var ReadState = require('../models/read_state.js');
var Project = require('../models/project.js');
var Sequelize = require('sequelize');

///get exisiting messages
exports.getMessages = function(req, res, next) {
  //define associations
  Thread.hasMany(Message, {foreignKey: 'thread_id', targetKey: 'thread_id'});
  Message.belongsTo(Thread, {foreignKey: 'thread_id', targetKey: 'thread_id'});
  Thread.belongsToMany(ReadState, {through: 'message', foreignKey: 'message_id', otherKey: 'thread_id'})
  ReadState.belongsToMany(Thread, { through: 'message', foreignKey: 'message_id', otherKey: 'thread_id'});
  Thread.hasMany(ThreadParticipant, {foreignKey: 'thread_id', targetKey: 'thread_id'});
  ThreadParticipant.belongsTo(Thread, {foreignKey: 'thread_id', targetKey: 'thread_id'});
  Message.hasMany(ReadState, {foreignKey: 'message_id', targetKey: 'message_id'});
  ReadState.belongsTo(Message, {foreignKey: 'message_id', targetKey: 'message_id'});

  //this is how you chain models together
  Thread.findAll({
    where: {project_id: req.body.project_id},
    include: [{
      model: ThreadParticipant,
    }, {
      model: Message,
      include: [
        ReadState
      ]
    }]
  }).then((result) => {
    console.log(result[0].dataValues);
    res.json({load_thread: result[0].dataValues});
  }).catch(err => {
    res.status(500).send('You broke it');
  });

}

//function to write a new message. Need to oncorporate read state.... or do we?
exports.writeMessage = function(req, res, next){
  //way easier than above
  Message.create({
    content: req.body.content,
    sender_id: req.body.sender_id,
    thread_id: req.body.thread_id
  }).then((message) => {
    console.log(message);
    res.json({
      message: message.dataValues
    });
  }).catch(err => {
    res.status(500).send('You broke it');
  });
}
