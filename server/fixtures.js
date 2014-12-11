if (Comments.find().count() === 0) {
  var now = new Date().getTime();
  var harryId = Meteor.users.insert({
    profile: { name: 'harryng' }
  });
  var harry = Meteor.users.findOne(harryId);
  var markId = Meteor.users.insert({
    profile: { name: 'markwilson' }
  });
  var mark = Meteor.users.findOne(markId);
  var ferId = Meteor.users.insert({
    profile: { name: 'ferfer' }
  });
  var fer = Meteor.users.findOne(ferId);

  var video1Id = Videos.insert({
    userId: mark._id,
    author: mark.profile.name,
    createdAt: new Date(),
    videoSourceId: "LdH1hSWGFGU",
    videoTitle: "Woman playing piano",
    categoryTopVote : ["lmao"],
    categoryVotes : {
      lmao: 0,
      love: 0,
      fku: 0,
      magic: 0,
      omfg: 0,
      shite: 0,
      nsfw: 0,
      die: 0
    }
  });
  var video = Videos.findOne(video1Id);

  var video2Id = Videos.insert({
    userId: mark._id,
    author: mark.profile.name,
    createdAt: new Date(),
    videoSourceId: "VxvDVhjALoU",
    videoTitle: "Funny Video 1",
    categoryTopVote : ["love"],
    categoryVotes : {
      lmao: 0,
      love: 0,
      fku: 0,
      magic: 0,
      omfg: 0,
      shite: 0,
      nsfw: 0,
      die: 0
    }
  });
  var video = Videos.findOne(video2Id);

  var video3Id = Videos.insert({
    userId: mark._id,
    author: mark.profile.name,
    createdAt: new Date(),
    videoSourceId: "no1q3wuvwmg",
    videoTitle: "bum implant",
    categoryTopVote : ["fku"],
    categoryVotes : {
      lmao: 0,
      love: 0,
      fku: 0,
      magic: 0,
      omfg: 0,
      shite: 0,
      nsfw: 0,
      die: 0
    }
  });
  var video = Videos.findOne(video3Id);

  var video4Id = Videos.insert({
    userId: mark._id,
    author: mark.profile.name,
    createdAt: new Date(),
    videoSourceId: "nIsCs9_-LP8",
    videoTitle: "Emotional baby! Too cute!",
    categoryTopVote : ["magic"],
    categoryVotes : {
      lmao: 0,
      love: 0,
      fku: 0,
      magic: 0,
      omfg: 0,
      shite: 0,
      nsfw: 0,
      die: 0
    }
  });
  var video = Videos.findOne(video3Id);

  var video5Id = Videos.insert({
    userId: mark._id,
    author: mark.profile.name,
    createdAt: new Date(),
    videoSourceId: "NIZmH96vUhU",
    videoTitle: "Câmera Escondida Annabelle - Inédita (05/10/14) - Annabelle Prank",
    categoryTopVote : ["omfg"],
    categoryVotes : {
      lmao: 0,
      love: 0,
      fku: 0,
      magic: 0,
      omfg: 0,
      shite: 0,
      nsfw: 0,
      die: 0
    }
  });
  var video = Videos.findOne(video3Id);

  var video6Id = Videos.insert({
    userId: mark._id,
    author: mark.profile.name,
    createdAt: new Date(),
    videoSourceId: "fA7XfJAPTLQ",
    videoTitle: "Cheating Death - Near Death Experiences",
    categoryTopVote : ["shite"],
    categoryVotes : {
      lmao: 0,
      love: 0,
      fku: 0,
      magic: 0,
      omfg: 0,
      shite: 0,
      nsfw: 0,
      die: 0
    }
  });
  var video = Videos.findOne(video3Id);

  var video7Id = Videos.insert({
    userId: mark._id,
    author: mark.profile.name,
    createdAt: new Date(),
    videoSourceId: "wWLhrHVySgA",
    videoTitle: "Alison Gold - Chinese Food (Official Music Video)",
    categoryTopVote : ["nsfw"],
    categoryVotes : {
      lmao: 0,
      love: 0,
      fku: 0,
      magic: 0,
      omfg: 0,
      shite: 0,
      nsfw: 0,
      die: 0
    }
  });
  var video = Videos.findOne(video3Id);

  var video8Id = Videos.insert({
    userId: mark._id,
    author: mark.profile.name,
    createdAt: new Date(),
    videoSourceId: "dTAAsCNK7RA",
    videoTitle: "OK Go - Here It Goes Again",
    categoryTopVote : ["die"],
    categoryVotes : {
      lmao: 0,
      love: 0,
      fku: 0,
      magic: 0,
      omfg: 0,
      shite: 0,
      nsfw: 0,
      die: 0
    }
  });
  var video = Videos.findOne(video3Id);

  var video9Id = Videos.insert({
    userId: mark._id,
    author: mark.profile.name,
    createdAt: new Date(),
    videoSourceId: "6bVa6jn4rpE",
    videoTitle: "University of Florida student Tasered at Kerry forum",
    categoryTopVote : ["lmao","love"],
    categoryVotes : {
      lmao: 0,
      love: 0,
      fku: 0,
      magic: 0,
      omfg: 0,
      shite: 0,
      nsfw: 0,
      die: 0
    }
  });
  var video = Videos.findOne(video9Id);

  Comments.insert({
    videoId: video._id,
    userId: harry._id,
    author: harry.profile.name,
    createdAt: new Date(),
    text: "evil laugh evil laugh",
    currentTime: 2
  });

  Comments.insert({
    videoId: video._id,
    userId: harry._id,
    author: harry.profile.name,
    createdAt: new Date(),
    text: "evil laugh evil laugh",
    currentTime: 4
  });

  Comments.insert({
    videoId: video._id,
    userId: mark._id,
    author: mark.profile.name,
    createdAt: new Date(),
    text: "yelp yelp yelp",
    currentTime: 1
  });

  Comments.insert({
    videoId: video._id,
    userId: mark._id,
    author: mark.profile.name,
    createdAt: new Date(),
    text: "wakeboard is fun",
    currentTime: 3
  });

  Comments.insert({
    videoId: video._id,
    userId: fer._id,
    author: fer.profile.name,
    createdAt: new Date(),
    text: "are you sure about that?",
    currentTime: 5
  });

  Comments.insert({
    videoId: video._id,
    userId: fer._id,
    author: fer.profile.name,
    createdAt: new Date(),
    text: "soccerballs",
    currentTime: 6
  });

}