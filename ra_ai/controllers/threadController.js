var sequelize = require('../objects/sequelize.js');
var Thread = require('../models/thread.js');
var ThreadParticipant = require('../models/thread_participant.js');
var Message = require('../models/message.js');
var ReadState = require('../models/read_state.js');
var Project = require('../models/project.js');
var Sequelize = require('sequelize');

//Should this go in associations?
Thread.hasMany(Message, {foreignKey: 'thread_id', targetKey: 'thread_id'});
Message.belongsTo(Thread, {foreignKey: 'thread_id', targetKey: 'thread_id'});
Thread.belongsToMany(ReadState, {through: 'message', foreignKey: 'message_id', otherKey: 'thread_id'})
ReadState.belongsToMany(Thread, { through: 'message', foreignKey: 'message_id', otherKey: 'thread_id'});
Thread.hasMany(ThreadParticipant, {foreignKey: 'thread_id', targetKey: 'thread_id'});
ThreadParticipant.belongsTo(Thread, {foreignKey: 'thread_id', targetKey: 'thread_id'});
Message.hasMany(ReadState, {foreignKey: 'message_id', targetKey: 'message_id'});
ReadState.belongsTo(Message, {foreignKey: 'message_id', targetKey: 'message_id'});


///get exisiting messages
exports.getMessages = function(req, res, next){
  console.log(req.body.project_id);
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
    console.log('AAAAA')
    res.json({load_thread: result[0].dataValues});
  }).catch(err => {
    res.status(500).send('You broke it');
  });

}
