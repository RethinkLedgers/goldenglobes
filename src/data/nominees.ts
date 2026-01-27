export interface Nominee {
  title: string;
  image: string;
  details?: string;
  description?: string;
}

export interface Category {
  name: string;
  icon: string;
  nominees: Nominee[];
}

// All images verified from TMDB - January 2026
export const categories: Category[] = [
  {
    name: "Best Picture",
    icon: "🏆",
    nominees: [
      { title: "Bugonia", image: "https://image.tmdb.org/t/p/w500/oxgsAQDAAxA92mFGYCZllgWkH9J.jpg", description: "Two friends who work at the same company think their boss is really an alien who wants to end the world. They make a plan to stop her, but things go wrong in ways they did not expect." },
      { title: "Frankenstein", image: "https://image.tmdb.org/t/p/w500/g4JtvGlQO7DByTI6frUobqvSL3R.jpg", description: "A scientist builds a living person out of dead body parts. When he sees what he has done, he runs away. The creature is left alone and tries to find someone who will care about him, but people are afraid of how he looks." },
      { title: "F1", image: "https://image.tmdb.org/t/p/w500/vqBmyAj0Xm9LnS1xe1MSlMAJyHq.jpg", description: "A race car driver who stopped racing a long time ago comes back to Formula 1 to help a younger driver learn. Together they try to win against the best teams in the world. Parts of the movie were filmed at real races." },
      { title: "Hamnet", image: "https://image.tmdb.org/t/p/w500/61xMzN4h8iLk0hq6oUzr9Ts6GE9.jpg", description: "The wife of William Shakespeare raises their children while he works far away in London. When their young son Hamnet gets sick, the family has to deal with a loss that changes them forever. Set in England in the 1590s." },
      { title: "Marty Supreme", image: "https://image.tmdb.org/t/p/w500/firAhZA0uQvRL2slp7v3AnOj0ZX.jpg", description: "Based on a real person named Marty Reisman who was one of the best ping-pong players in New York City in the 1950s. He spent his days playing in small clubs around the city, going up against anyone who would challenge him." },
      { title: "One Battle After Another", image: "https://image.tmdb.org/t/p/w500/m1jFoahEbeQXtx4zArT2FKdbNIj.jpg", description: "A family in Los Angeles in the 1970s runs a big business. The father is in charge, but the people around him all want more. His right-hand man has plans of his own, and a new person shows up who wants a seat at the table. The story follows what happens to each of them as things start to fall apart." },
      { title: "The Secret Agent", image: "https://image.tmdb.org/t/p/w500/rZqolYhxMEe6TZZTjSmFw9crDTD.jpg", description: "Based on a true story. A man goes undercover to get close to dangerous criminals in Brazil. The longer he pretends to be someone else, the harder it gets to remember who he really is." },
      { title: "Sentimental Value", image: "https://image.tmdb.org/t/p/w500/pz9NCWxxOk3o0W3v1Zkhawrwb4i.jpg", description: "After their father dies, a family meets at their old house in Norway. They have not been together in a long time. Old fights and secrets they buried years ago start to come back up. Each person remembers things differently, and no one can agree on what really happened in the past. They have to figure out if they can forgive each other and move on." },
      { title: "Sinners", image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg", description: "Two twin brothers move back to their small hometown in the American South in the 1930s. They want to open a blues club and start a new life. But something evil has been hiding in the town for a long time. Vampires come out and start going after the people they care about. The brothers have to fight to keep everyone alive." },
      { title: "Train Dreams", image: "https://image.tmdb.org/t/p/w500/wfzYOVdafdbD1d3SxNqiBtV2Yhx.jpg", description: "A man named Robert Grainier grows up alone and finds work cutting down trees in the forests of the American West in the early 1900s. He meets a woman, they get married, and they build a small life together. But the world keeps changing around him, and he loses the people closest to him. The movie follows his whole life from start to finish. Based on a short book by Denis Johnson." },
    ],
  },
  {
    name: "Best Actor",
    icon: "🎭",
    nominees: [
      { title: "Timothée Chalamet", image: "https://image.tmdb.org/t/p/w500/dFxpwRpmzpVfP1zjluH68DeQhyj.jpg", details: "Marty Supreme", description: "He plays Marty Reisman, a real person who was one of the best ping-pong players in 1950s New York City. He spends his days in small clubs taking on anyone who will play him and trying to make a name for himself." },
      { title: "Leonardo DiCaprio", image: "https://image.tmdb.org/t/p/w500/iqPBAdsFdAVCdahQM29kTG6UgD7.jpg", details: "One Battle After Another", description: "He plays Bob Ferguson, the head of a rich family in 1970s Los Angeles who runs a big business. The people around him all want more for themselves, and he has to figure out who he can trust before things fall apart." },
      { title: "Ethan Hawke", image: "https://image.tmdb.org/t/p/w500/2LoTr6x0TEM7L5em4kSx1VmGDgG.jpg", details: "Blue Moon", description: "He plays Lorenz Hart, a real songwriter who wrote many famous songs in the early 1900s. The movie follows the last night of his life as he thinks back on the people he loved and the choices he made." },
      { title: "Michael B. Jordan", image: "https://image.tmdb.org/t/p/w500/515xNvaMC6xOEOlo0sFqW69ZqUH.jpg", details: "Sinners", description: "He plays twin brothers named Smoke and Stack who move back to their small town in the 1930s South. They want to start over, but they end up having to fight real vampires to keep the people around them safe." },
      { title: "Wagner Moura", image: "https://image.tmdb.org/t/p/w500/yJjV1ZCQbCSSgRy05FncCKjyaY4.jpg", details: "The Secret Agent", description: "He plays Armando, a man hiding from the government in Brazil in the 1970s. He uses a fake name and tries to stay alive while on the run. The longer he keeps up the act, the harder it gets to hold on to who he really is. He also directed the movie." },
    ],
  },
  {
    name: "Best Actress",
    icon: "🎭",
    nominees: [
      { title: "Jessie Buckley", image: "https://image.tmdb.org/t/p/w500/i8IlkFbZqKUgkypZKpdhrw00uqw.jpg", details: "Hamnet", description: "She plays Agnes, the wife of the famous writer William Shakespeare. He is away working in London most of the time, so she takes care of their children on her own. When their young son Hamnet gets very sick, she has to face it without him there." },
      { title: "Rose Byrne", image: "https://image.tmdb.org/t/p/w500/6YauDiiTBwRGC1xnwspPmNvPWUu.jpg", details: "If I Had Legs I'd Kick You", description: "She plays Linda, a mother who is having the worst day of her life. Her daughter is sick and no one can figure out why. Her husband is never home. Everything keeps going wrong and she is trying her best to hold it all together." },
      { title: "Kate Hudson", image: "https://image.tmdb.org/t/p/w500/s79lH1QzEg2fkXULKBxRmU9aNr8.jpg", details: "Song Sung Blue", description: "She plays Claire Sardina, a real person from Wisconsin who loves the singer Neil Diamond so much that she and her husband Mike start dressing up and singing his songs at bars and clubs as a two-person act called Lightning and Thunder." },
      { title: "Renate Reinsve", image: "https://image.tmdb.org/t/p/w500/eepHWTjtKRdGcrtchFb3axdp2eL.jpg", details: "Sentimental Value", description: "She plays Nora Borg, a woman who lost her mother. Her father is a film director she has not talked to in a long time. When he shows up wanting to make a movie at the family house, Nora has to deal with him again and all the things they never talked about." },
      { title: "Emma Stone", image: "https://image.tmdb.org/t/p/w500/cZ8a3QvAnj2cgcgVL6g4XaqPzpL.jpg", details: "Bugonia", description: "She plays Michelle Fuller, the head of a big company. Two men grab her and lock her up because they believe she is an alien trying to end the world. She has to figure out how to get away from them." },
    ],
  },
  {
    name: "Best Supporting Actress",
    icon: "⭐",
    nominees: [
      { title: "Elle Fanning", image: "https://image.tmdb.org/t/p/w500/e8CUyxQSE99y5IOfzSLtHC0B0Ch.jpg", details: "Sentimental Value", description: "She plays Rachel Kemp, an American actress who is hired by a film director to star in a movie at his family home in Norway. She gets pulled into the family's problems without knowing the full story behind them." },
      { title: "Inga Ibsdotter Lilleaas", image: "https://image.tmdb.org/t/p/w500/wlZPIgnXMpK3Nvvhg0bZzmWxZDH.jpg", details: "Sentimental Value", description: "She plays Agnes Borg, one of the family members who comes back to the house in Norway after a death in the family. She has her own history with the people there, and being together again brings up things she tried to leave behind." },
      { title: "Amy Madigan", image: "https://image.tmdb.org/t/p/w500/xgtQOuPAmQZXWUO2PXetNpXm08A.jpg", details: "Weapons", description: "She plays Aunt Gladys, a strange woman in a small town where children have gone missing. She is the aunt of the only kid in the class who did not disappear, and she knows more than she lets on." },
      { title: "Wunmi Mosaku", image: "https://image.tmdb.org/t/p/w500/mWDsVCo9sBcekrsjUTsoCFLhtYt.jpg", details: "Sinners", description: "She plays Annie, a healer who lives in a small Southern town in the 1930s. She knows about the supernatural and is the one who helps the twin brothers understand what they are up against when the vampires come." },
      { title: "Teyana Taylor", image: "https://image.tmdb.org/t/p/w500/foj8l6GGlZxZXcW6pU5wnNxDjSx.jpg", details: "One Battle After Another", description: "She plays Perfidia, a woman who used to be part of a group fighting for change in the 1970s. She disappeared years ago, and now the people from her past are trying to find out what happened to her." },
    ],
  },
  {
    name: "Best Supporting Actor",
    icon: "⭐",
    nominees: [
      { title: "Benicio del Toro", image: "https://image.tmdb.org/t/p/w500/aYomJWx0B2B8ra6Rmgt8lr0XCrw.jpg", details: "One Battle After Another", description: "He plays Sensei Sergio, the right-hand man of a powerful family leader in 1970s Los Angeles. He has been loyal for years, but he also has plans of his own that could change everything." },
      { title: "Jacob Elordi", image: "https://image.tmdb.org/t/p/w500/qZNRPWCP2c5d0YaYLTzHXU9Rdoe.jpg", details: "Frankenstein", description: "He plays the Creature, a being built from dead body parts and brought to life by a scientist named Victor Frankenstein. After he is left alone, he tries to learn about the world and find someone who will accept him." },
      { title: "Delroy Lindo", image: "https://image.tmdb.org/t/p/w500/kLwUBBmEIdchrLqwsYzgLB2B6q5.jpg", details: "Sinners", description: "He plays Delta Slim, an old harmonica player and music legend in a small Southern town in the 1930s. When the twin brothers come back to town and open a blues club, he is one of the first people they ask to play." },
      { title: "Sean Penn", image: "https://image.tmdb.org/t/p/w500/9glqNTVpFpdN1nFklKaHPUyCwR6.jpg", details: "One Battle After Another", description: "He plays Colonel Steven Lockjaw, a dangerous man from the past who shows up looking for someone. He is hunting down the daughter of two people who wronged him years ago, and he will not stop until he finds her." },
      { title: "Stellan Skarsgård", image: "https://image.tmdb.org/t/p/w500/x78BtYHElirO7Iw8bL4m8CnzRDc.jpg", details: "Sentimental Value", description: "He plays Gustav Borg, a film director and father who has not been close to his family in a long time. After his wife dies, he goes back to the family house in Norway and wants to make a movie there, which brings up old problems with his daughter." },
    ],
  },
  {
    name: "Best Director",
    icon: "🎬",
    nominees: [
      { title: "Paul Thomas Anderson", image: "https://image.tmdb.org/t/p/w500/wKAs2LtLYSUzt3ZZ8pnxMwuEWuR.jpg", details: "One Battle After Another", description: "He directed One Battle After Another, a story about a rich family in 1970s Los Angeles and the people around them who all want more for themselves. He also directed Boogie Nights, There Will Be Blood, and Licorice Pizza." },
      { title: "Ryan Coogler", image: "https://image.tmdb.org/t/p/w500/dux4DCDaL6c639DTXGiV7nm1wcN.jpg", details: "Sinners", description: "He directed Sinners, a movie about twin brothers who go back to their small town in the 1930s South and end up fighting vampires. He also directed Black Panther and Creed." },
      { title: "Josh Safdie", image: "https://image.tmdb.org/t/p/w500/iNyilK3Ag6qeOguc0zysxZXEIpJ.jpg", details: "Marty Supreme", description: "He directed Marty Supreme, a movie about a real ping-pong player in 1950s New York City who spent his days in small clubs taking on anyone who would challenge him. He also co-directed Uncut Gems with his brother." },
      { title: "Joachim Trier", image: "https://image.tmdb.org/t/p/w500/o5KXJRWbzyGYSxDhXsBqbCiZnqU.jpg", details: "Sentimental Value", description: "He directed Sentimental Value, a movie about a family that comes together at their old house in Norway after a death and has to deal with old fights and secrets. He also directed The Worst Person in the World." },
      { title: "Chloé Zhao", image: "https://image.tmdb.org/t/p/w500/r8DmTdOqHbDUydCOVb277rncPTK.jpg", details: "Hamnet", description: "She directed Hamnet, a movie about the family of William Shakespeare set in 1590s England. His wife raises their children alone, and when their young son gets very sick, she has to face it without him. She also directed Nomadland, which won Best Picture in 2021." },
    ],
  },
  {
    name: "Best Adapted Screenplay",
    icon: "📝",
    nominees: [
      { title: "Bugonia", image: "https://image.tmdb.org/t/p/w500/oxgsAQDAAxA92mFGYCZllgWkH9J.jpg", description: "Two friends who work at the same company think their boss is really an alien who wants to end the world. They make a plan to stop her, but things go wrong in ways they did not expect." },
      { title: "Frankenstein", image: "https://image.tmdb.org/t/p/w500/g4JtvGlQO7DByTI6frUobqvSL3R.jpg", description: "A scientist builds a living person out of dead body parts. When he sees what he has done, he runs away. The creature is left alone and tries to find someone who will care about him, but people are afraid of how he looks." },
      { title: "Hamnet", image: "https://image.tmdb.org/t/p/w500/61xMzN4h8iLk0hq6oUzr9Ts6GE9.jpg", description: "The wife of William Shakespeare raises their children while he works far away in London. When their young son Hamnet gets sick, the family has to deal with a loss that changes them forever. Set in England in the 1590s." },
      { title: "One Battle After Another", image: "https://image.tmdb.org/t/p/w500/m1jFoahEbeQXtx4zArT2FKdbNIj.jpg", description: "A family in Los Angeles in the 1970s runs a big business. The father is in charge, but the people around him all want more. His right-hand man has plans of his own, and a new person shows up who wants a seat at the table. The story follows what happens to each of them as things start to fall apart." },
      { title: "Train Dreams", image: "https://image.tmdb.org/t/p/w500/wfzYOVdafdbD1d3SxNqiBtV2Yhx.jpg", description: "A man named Robert Grainier grows up alone and finds work cutting down trees in the forests of the American West in the early 1900s. He meets a woman, they get married, and they build a small life together. But the world keeps changing around him, and he loses the people closest to him. The movie follows his whole life from start to finish. Based on a short book by Denis Johnson." },
    ],
  },
  {
    name: "Best Original Screenplay",
    icon: "✍️",
    nominees: [
      { title: "Blue Moon", image: "https://image.tmdb.org/t/p/w500/nij3i5ziQdqfiK29gb4rX1bkmVy.jpg", description: "On one night in 1943, a songwriter named Lorenz Hart sits in a bar while his old partner Richard Rodgers celebrates a big new show without him. Lorenz looks back on his life and tries to figure out where things went wrong." },
      { title: "It Was Just an Accident", image: "https://image.tmdb.org/t/p/w500/eNYGj2DG3n8OrVPTfYunpPW9uas.jpg", description: "A car mechanic who was once locked up in an Iranian prison sees a man walk into his shop one day. He thinks the man might be the same person who hurt him when he was in jail, and he has to decide what to do about it." },
      { title: "Marty Supreme", image: "https://image.tmdb.org/t/p/w500/firAhZA0uQvRL2slp7v3AnOj0ZX.jpg", description: "Based on a real person named Marty Reisman who was one of the best ping-pong players in New York City in the 1950s. He spent his days playing in small clubs around the city, going up against anyone who would challenge him." },
      { title: "Sentimental Value", image: "https://image.tmdb.org/t/p/w500/pz9NCWxxOk3o0W3v1Zkhawrwb4i.jpg", description: "After their father dies, a family meets at their old house in Norway. They have not been together in a long time. Old fights and secrets they buried years ago start to come back up. Each person remembers things differently, and no one can agree on what really happened in the past. They have to figure out if they can forgive each other and move on." },
      { title: "Sinners", image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg", description: "Two twin brothers move back to their small hometown in the American South in the 1930s. They want to open a blues club and start a new life. But something evil has been hiding in the town for a long time. Vampires come out and start going after the people they care about. The brothers have to fight to keep everyone alive." },
    ],
  },
  {
    name: "Best Original Song",
    icon: "🎤",
    nominees: [
      { title: "Dear Me", image: "https://image.tmdb.org/t/p/w500/uhfvnmtq6cgpI038YrRsgmThb2D.jpg", details: "Diane Warren: Relentless", description: "This song comes from a documentary about Diane Warren, a songwriter who has been writing hit songs for over 40 years. She has been nominated for an Oscar 15 times before but never won. The film takes a close look at her life, how she works, and why she never stops writing. The song Dear Me is written as a letter to her younger self." },
      { title: "Golden", image: "https://image.tmdb.org/t/p/w500/zT7Lhw3BhJbMkRqm9Zlx2YGMsY0.jpg", details: "KPop Demon Hunters", description: "This song comes from an animated movie about three K-pop singers named Rumi, Mira, and Zoey who live double lives. By day they sell out stadiums, but they also have secret powers they use to protect people from demons and monsters. Golden is about finding the strength inside yourself even when everything feels like it is falling apart." },
      { title: "I Lied to You", image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg", details: "Sinners", description: "This song comes from Sinners, a movie set in the 1930s South about twin brothers who come home and end up fighting vampires. Blues music is a big part of the whole movie. I Lied to You is a blues song that plays during the story, and it is about the things people hide from the ones they love and the cost of keeping secrets." },
      { title: "Sweet Dreams of Joy", image: "https://image.tmdb.org/t/p/w500/l2IIanbP4HVxL9yginZzT73kE9j.jpg", details: "Viva Verdi!", description: "This song comes from a documentary about Casa Verdi, a special retirement home in Milan, Italy that was built by the famous opera composer Giuseppe Verdi over 100 years ago. Old opera singers and musicians live there together, and they help teach young music students from around the world. The song ties into the film's message about music lasting a lifetime." },
      { title: "Train Dreams", image: "https://image.tmdb.org/t/p/w500/wfzYOVdafdbD1d3SxNqiBtV2Yhx.jpg", details: "Train Dreams", description: "This song comes from the movie Train Dreams, about a man named Robert Grainier who spends his life working in the forests of the American West in the early 1900s. He goes through love and loss as the world changes around him. The song reflects the feeling of looking back on a long life and all the people and places that are gone." },
    ],
  },
  {
    name: "Best Original Score",
    icon: "🎵",
    nominees: [
      { title: "Bugonia", image: "https://image.tmdb.org/t/p/w500/oxgsAQDAAxA92mFGYCZllgWkH9J.jpg", description: "Two friends who work at the same company think their boss is really an alien who wants to end the world. They make a plan to stop her, but things go wrong in ways they did not expect." },
      { title: "Frankenstein", image: "https://image.tmdb.org/t/p/w500/g4JtvGlQO7DByTI6frUobqvSL3R.jpg", description: "A scientist builds a living person out of dead body parts. When he sees what he has done, he runs away. The creature is left alone and tries to find someone who will care about him, but people are afraid of how he looks." },
      { title: "Hamnet", image: "https://image.tmdb.org/t/p/w500/61xMzN4h8iLk0hq6oUzr9Ts6GE9.jpg", description: "The wife of William Shakespeare raises their children while he works far away in London. When their young son Hamnet gets sick, the family has to deal with a loss that changes them forever. Set in England in the 1590s." },
      { title: "One Battle After Another", image: "https://image.tmdb.org/t/p/w500/m1jFoahEbeQXtx4zArT2FKdbNIj.jpg", description: "A family in Los Angeles in the 1970s runs a big business. The father is in charge, but the people around him all want more. His right-hand man has plans of his own, and a new person shows up who wants a seat at the table. The story follows what happens to each of them as things start to fall apart." },
      { title: "Sinners", image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg", description: "Two twin brothers move back to their small hometown in the American South in the 1930s. They want to open a blues club and start a new life. But something evil has been hiding in the town for a long time. Vampires come out and start going after the people they care about. The brothers have to fight to keep everyone alive." },
    ],
  },
  {
    name: "Best International Feature",
    icon: "🌍",
    nominees: [
      { title: "It Was Just an Accident", image: "https://image.tmdb.org/t/p/w500/eNYGj2DG3n8OrVPTfYunpPW9uas.jpg", description: "A car mechanic who was once locked up in an Iranian prison sees a man walk into his shop one day. He thinks the man might be the same person who hurt him when he was in jail, and he has to decide what to do about it." },
      { title: "Sentimental Value", image: "https://image.tmdb.org/t/p/w500/pz9NCWxxOk3o0W3v1Zkhawrwb4i.jpg", description: "After their father dies, a family meets at their old house in Norway. They have not been together in a long time. Old fights and secrets they buried years ago start to come back up. Each person remembers things differently, and no one can agree on what really happened in the past. They have to figure out if they can forgive each other and move on." },
      { title: "Sirât", image: "https://image.tmdb.org/t/p/w500/bzBtsLi17rK4G6kDvOXfUZfAhca.jpg", description: "A father and his teenage son live in Morocco. When their daughter and sister goes missing, they go looking for her at secret outdoor parties held deep in the desert. The search takes them through a world they do not know and forces them to face things about their family they have been avoiding." },
      { title: "The Secret Agent", image: "https://image.tmdb.org/t/p/w500/rZqolYhxMEe6TZZTjSmFw9crDTD.jpg", description: "Based on a true story. A man goes undercover to get close to dangerous criminals in Brazil. The longer he pretends to be someone else, the harder it gets to remember who he really is." },
      { title: "The Voice of Hind Rajab", image: "https://image.tmdb.org/t/p/w500/fBcBY8kdBiPsRdtkbldwg3ThlyJ.jpg", description: "Based on the true story of Hind Rajab, a six-year-old girl in Gaza. While trapped in a car during a conflict, she called for help on the phone. The movie follows what happened during that call and the people who tried to reach her in time." },
    ],
  },
  {
    name: "Best Animated Feature",
    icon: "🎨",
    nominees: [
      { title: "Arco", image: "https://image.tmdb.org/t/p/w500/sV5B8qn4HhIPCKNFighAVMjKBtR.jpg", description: "A boy named Arco lives far in the future. On his first time flying in a rainbow suit, he loses control and lands in the year 2075. A girl named Iris finds him and tries to help him get back to his own time. Together they go on an adventure and learn about the world and each other." },
      { title: "Elio", image: "https://image.tmdb.org/t/p/w500/7z8jDiTZZco9moIKpTUImFtTy7o.jpg", description: "An eleven-year-old boy named Elio loves space and feels like he does not belong on Earth. One day, aliens beam him up to a place called the Communiverse because they think he is Earth's ambassador. He has to figure out how to handle the job while making friends with the aliens he meets." },
      { title: "KPop Demon Hunters", image: "https://image.tmdb.org/t/p/w500/zT7Lhw3BhJbMkRqm9Zlx2YGMsY0.jpg", description: "This song comes from an animated movie about three K-pop singers named Rumi, Mira, and Zoey who live double lives. By day they sell out stadiums, but they also have secret powers they use to protect people from demons and monsters. Golden is about finding the strength inside yourself even when everything feels like it is falling apart." },
      { title: "Little Amélie", image: "https://image.tmdb.org/t/p/w500/smasJY24MYsQ6JMxW817KmCimVt.jpg", description: "Based on a book by Amélie Nothomb. A little girl named Amélie grows up in Japan in the 1970s. She sees the world in her own way and discovers what it means to be alive through the small things around her, like rain, food, and the garden where her family lives." },
      { title: "Zootopia 2", image: "https://image.tmdb.org/t/p/w500/bjUWGw0Ao0qVWxagN3VCwBJHVo6.jpg", description: "Judy Hopps and Nick Wilde are now partners at the police department in Zootopia. They get pulled into a new case when a mysterious snake named Gary De'Snake frames them for a crime. To solve the case, they have to go undercover and explore parts of the city they have never seen before." },
    ],
  },
  {
    name: "Best Documentary Feature",
    icon: "🎥",
    nominees: [
      { title: "Come See Me in the Good Light", image: "https://image.tmdb.org/t/p/w500/5AFbcDGT78cLZTyHTSDBohczjuO.jpg", description: "Two poets named Andrea Gibson and Megan Falley are married and deeply in love. When Andrea finds out they have cancer that cannot be cured, they spend what might be their last year together. The film follows them through that time at their home in Colorado." },
      { title: "Cutting Through the Rocks", image: "https://image.tmdb.org/t/p/w500/qefjf5TeM0uRzrFU2c4xYt6ew9z.jpg", description: "Sara Shahverdi is the first woman ever elected to a local council in her village in Iran. She rides motorcycles, fights to stop child marriages, and trains teenage girls to stand up for themselves. Not everyone in the village is happy about the changes she is trying to make." },
      { title: "Mr. Nobody Against Putin", image: "https://image.tmdb.org/t/p/w500/aXCEnrqecvPXohuptN0JRgIvkDj.jpg", description: "A schoolteacher in a small Russian town secretly films what is happening inside his school after Russia invades Ukraine. The government is using schools to spread its message and recruit young people for the war. He risks everything to get the footage out to the world." },
      { title: "The Alabama Solution", image: "https://image.tmdb.org/t/p/w500/gultnK0rYs4xLLYhxQ9ZnvPfVAn.jpg", description: "Men locked up in Alabama prisons use hidden cell phones to film what is really going on behind the walls. They show that people are being hurt and that officials are covering it up. The film follows their fight to tell the truth and survive inside one of the most dangerous prison systems in the country." },
      { title: "The Perfect Neighbor", image: "https://image.tmdb.org/t/p/w500/2NE7yN45zo19o4LJr6JFxDWmh2b.jpg", description: "In a neighborhood in Florida, a long-running fight between neighbors ends with a woman named Ajike Owens being shot and killed. The film uses police body camera footage and interviews to show what happened and looks at how race and stand your ground laws played a role." },
    ],
  },
  {
    name: "Best Costume Design",
    icon: "👗",
    nominees: [
      { title: "Avatar: Fire and Ash", image: "https://image.tmdb.org/t/p/w500/5bxrxnRaxZooBAxgUVBZ13dpzC7.jpg", description: "Jake Sully and his family are still living on Pandora with the Metkayina clan. After losing their oldest son, they are dealing with grief and trying to stay safe. A dangerous new Na'vi tribe called the Ash People attacks, and the human soldiers come back with even bigger plans. The family gets split up and has to fight to find each other and protect their home." },
      { title: "Frankenstein", image: "https://image.tmdb.org/t/p/w500/g4JtvGlQO7DByTI6frUobqvSL3R.jpg", description: "A scientist builds a living person out of dead body parts. When he sees what he has done, he runs away. The creature is left alone and tries to find someone who will care about him, but people are afraid of how he looks." },
      { title: "Hamnet", image: "https://image.tmdb.org/t/p/w500/61xMzN4h8iLk0hq6oUzr9Ts6GE9.jpg", description: "The wife of William Shakespeare raises their children while he works far away in London. When their young son Hamnet gets sick, the family has to deal with a loss that changes them forever. Set in England in the 1590s." },
      { title: "Marty Supreme", image: "https://image.tmdb.org/t/p/w500/firAhZA0uQvRL2slp7v3AnOj0ZX.jpg", description: "Based on a real person named Marty Reisman who was one of the best ping-pong players in New York City in the 1950s. He spent his days playing in small clubs around the city, going up against anyone who would challenge him." },
      { title: "Sinners", image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg", description: "Two twin brothers move back to their small hometown in the American South in the 1930s. They want to open a blues club and start a new life. But something evil has been hiding in the town for a long time. Vampires come out and start going after the people they care about. The brothers have to fight to keep everyone alive." },
    ],
  },
  {
    name: "Best Makeup & Hairstyling",
    icon: "💄",
    nominees: [
      { title: "Frankenstein", image: "https://image.tmdb.org/t/p/w500/g4JtvGlQO7DByTI6frUobqvSL3R.jpg", description: "A scientist builds a living person out of dead body parts. When he sees what he has done, he runs away. The creature is left alone and tries to find someone who will care about him, but people are afraid of how he looks." },
      { title: "Kokuho", image: "https://image.tmdb.org/t/p/w500/egDmNUBcSvu6aqQPCfyd1UneCYr.jpg", description: "After his yakuza father dies, a teenage boy named Kikuo is taken in by a famous kabuki actor. He and the actor's son Shunsuke both train to perform on stage. Over fifty years, they push each other to get better while dealing with rivalry, friendship, and what it means to give your whole life to your art." },
      { title: "Sinners", image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg", description: "Two twin brothers move back to their small hometown in the American South in the 1930s. They want to open a blues club and start a new life. But something evil has been hiding in the town for a long time. Vampires come out and start going after the people they care about. The brothers have to fight to keep everyone alive." },
      { title: "The Smashing Machine", image: "https://image.tmdb.org/t/p/w500/mPuBDGrVIBGOymBxR6rO3iIvBSe.jpg", description: "Based on a true story. In the late 1990s, a fighter named Mark Kerr wants to become the best in the world at mixed martial arts. As he rises to the top, he also struggles with pain pill addiction and a rocky relationship with his girlfriend Dawn." },
      { title: "The Ugly Stepsister", image: "https://image.tmdb.org/t/p/w500/rayAREIKtSinuov10GvrZHyXfXH.jpg", description: "A dark retelling of Cinderella from the stepsister's point of view. A girl named Elvira is pushed by her mother to marry a prince and escape poverty. Her mother puts her through painful surgeries to make her look more beautiful. As the prince's ball gets closer, Elvira's jealousy of her beautiful stepsister Agnes grows and things take a dark turn." },
    ],
  },
  {
    name: "Best Production Design",
    icon: "🏛️",
    nominees: [
      { title: "Frankenstein", image: "https://image.tmdb.org/t/p/w500/g4JtvGlQO7DByTI6frUobqvSL3R.jpg", description: "A scientist builds a living person out of dead body parts. When he sees what he has done, he runs away. The creature is left alone and tries to find someone who will care about him, but people are afraid of how he looks." },
      { title: "Hamnet", image: "https://image.tmdb.org/t/p/w500/61xMzN4h8iLk0hq6oUzr9Ts6GE9.jpg", description: "The wife of William Shakespeare raises their children while he works far away in London. When their young son Hamnet gets sick, the family has to deal with a loss that changes them forever. Set in England in the 1590s." },
      { title: "Marty Supreme", image: "https://image.tmdb.org/t/p/w500/firAhZA0uQvRL2slp7v3AnOj0ZX.jpg", description: "Based on a real person named Marty Reisman who was one of the best ping-pong players in New York City in the 1950s. He spent his days playing in small clubs around the city, going up against anyone who would challenge him." },
      { title: "One Battle After Another", image: "https://image.tmdb.org/t/p/w500/m1jFoahEbeQXtx4zArT2FKdbNIj.jpg", description: "A family in Los Angeles in the 1970s runs a big business. The father is in charge, but the people around him all want more. His right-hand man has plans of his own, and a new person shows up who wants a seat at the table. The story follows what happens to each of them as things start to fall apart." },
      { title: "Sinners", image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg", description: "Two twin brothers move back to their small hometown in the American South in the 1930s. They want to open a blues club and start a new life. But something evil has been hiding in the town for a long time. Vampires come out and start going after the people they care about. The brothers have to fight to keep everyone alive." },
    ],
  },
  {
    name: "Best Sound",
    icon: "🔊",
    nominees: [
      { title: "Frankenstein", image: "https://image.tmdb.org/t/p/w500/g4JtvGlQO7DByTI6frUobqvSL3R.jpg", description: "A scientist builds a living person out of dead body parts. When he sees what he has done, he runs away. The creature is left alone and tries to find someone who will care about him, but people are afraid of how he looks." },
      { title: "F1", image: "https://image.tmdb.org/t/p/w500/vqBmyAj0Xm9LnS1xe1MSlMAJyHq.jpg", description: "A race car driver who stopped racing a long time ago comes back to Formula 1 to help a younger driver learn. Together they try to win against the best teams in the world. Parts of the movie were filmed at real races." },
      { title: "One Battle After Another", image: "https://image.tmdb.org/t/p/w500/m1jFoahEbeQXtx4zArT2FKdbNIj.jpg", description: "A family in Los Angeles in the 1970s runs a big business. The father is in charge, but the people around him all want more. His right-hand man has plans of his own, and a new person shows up who wants a seat at the table. The story follows what happens to each of them as things start to fall apart." },
      { title: "Sinners", image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg", description: "Two twin brothers move back to their small hometown in the American South in the 1930s. They want to open a blues club and start a new life. But something evil has been hiding in the town for a long time. Vampires come out and start going after the people they care about. The brothers have to fight to keep everyone alive." },
      { title: "Sirât", image: "https://image.tmdb.org/t/p/w500/bzBtsLi17rK4G6kDvOXfUZfAhca.jpg", description: "A father and his teenage son live in Morocco. When their daughter and sister goes missing, they go looking for her at secret outdoor parties held deep in the desert. The search takes them through a world they do not know and forces them to face things about their family they have been avoiding." },
    ],
  },
  {
    name: "Best Film Editing",
    icon: "✂️",
    nominees: [
      { title: "F1", image: "https://image.tmdb.org/t/p/w500/vqBmyAj0Xm9LnS1xe1MSlMAJyHq.jpg", description: "A race car driver who stopped racing a long time ago comes back to Formula 1 to help a younger driver learn. Together they try to win against the best teams in the world. Parts of the movie were filmed at real races." },
      { title: "Marty Supreme", image: "https://image.tmdb.org/t/p/w500/firAhZA0uQvRL2slp7v3AnOj0ZX.jpg", description: "Based on a real person named Marty Reisman who was one of the best ping-pong players in New York City in the 1950s. He spent his days playing in small clubs around the city, going up against anyone who would challenge him." },
      { title: "One Battle After Another", image: "https://image.tmdb.org/t/p/w500/m1jFoahEbeQXtx4zArT2FKdbNIj.jpg", description: "A family in Los Angeles in the 1970s runs a big business. The father is in charge, but the people around him all want more. His right-hand man has plans of his own, and a new person shows up who wants a seat at the table. The story follows what happens to each of them as things start to fall apart." },
      { title: "Sentimental Value", image: "https://image.tmdb.org/t/p/w500/pz9NCWxxOk3o0W3v1Zkhawrwb4i.jpg", description: "After their father dies, a family meets at their old house in Norway. They have not been together in a long time. Old fights and secrets they buried years ago start to come back up. Each person remembers things differently, and no one can agree on what really happened in the past. They have to figure out if they can forgive each other and move on." },
      { title: "Sinners", image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg", description: "Two twin brothers move back to their small hometown in the American South in the 1930s. They want to open a blues club and start a new life. But something evil has been hiding in the town for a long time. Vampires come out and start going after the people they care about. The brothers have to fight to keep everyone alive." },
    ],
  },
  {
    name: "Best Cinematography",
    icon: "📷",
    nominees: [
      { title: "Frankenstein", image: "https://image.tmdb.org/t/p/w500/g4JtvGlQO7DByTI6frUobqvSL3R.jpg", description: "A scientist builds a living person out of dead body parts. When he sees what he has done, he runs away. The creature is left alone and tries to find someone who will care about him, but people are afraid of how he looks." },
      { title: "Marty Supreme", image: "https://image.tmdb.org/t/p/w500/firAhZA0uQvRL2slp7v3AnOj0ZX.jpg", description: "Based on a real person named Marty Reisman who was one of the best ping-pong players in New York City in the 1950s. He spent his days playing in small clubs around the city, going up against anyone who would challenge him." },
      { title: "One Battle After Another", image: "https://image.tmdb.org/t/p/w500/m1jFoahEbeQXtx4zArT2FKdbNIj.jpg", description: "A family in Los Angeles in the 1970s runs a big business. The father is in charge, but the people around him all want more. His right-hand man has plans of his own, and a new person shows up who wants a seat at the table. The story follows what happens to each of them as things start to fall apart." },
      { title: "Sinners", image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg", description: "Two twin brothers move back to their small hometown in the American South in the 1930s. They want to open a blues club and start a new life. But something evil has been hiding in the town for a long time. Vampires come out and start going after the people they care about. The brothers have to fight to keep everyone alive." },
      { title: "Train Dreams", image: "https://image.tmdb.org/t/p/w500/wfzYOVdafdbD1d3SxNqiBtV2Yhx.jpg", description: "A man named Robert Grainier grows up alone and finds work cutting down trees in the forests of the American West in the early 1900s. He meets a woman, they get married, and they build a small life together. But the world keeps changing around him, and he loses the people closest to him. The movie follows his whole life from start to finish. Based on a short book by Denis Johnson." },
    ],
  },
  {
    name: "Best Visual Effects",
    icon: "✨",
    nominees: [
      { title: "Avatar: Fire and Ash", image: "https://image.tmdb.org/t/p/w500/5bxrxnRaxZooBAxgUVBZ13dpzC7.jpg", description: "Jake Sully and his family are still living on Pandora with the Metkayina clan. After losing their oldest son, they are dealing with grief and trying to stay safe. A dangerous new Na'vi tribe called the Ash People attacks, and the human soldiers come back with even bigger plans. The family gets split up and has to fight to find each other and protect their home." },
      { title: "F1", image: "https://image.tmdb.org/t/p/w500/vqBmyAj0Xm9LnS1xe1MSlMAJyHq.jpg", description: "A race car driver who stopped racing a long time ago comes back to Formula 1 to help a younger driver learn. Together they try to win against the best teams in the world. Parts of the movie were filmed at real races." },
      { title: "Jurassic World Rebirth", image: "https://image.tmdb.org/t/p/w500/1RICxzeoNCAO5NpcRMIgg1XT6fm.jpg", description: "Five years after the last movie, dinosaurs live near the equator where the climate keeps them alive. A team led by a woman named Zora is sent on a secret mission to collect samples from three of the biggest dinosaurs on a remote island. When they find a shipwrecked family, they all get stuck on the island and have to survive together." },
      { title: "Sinners", image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg", description: "Two twin brothers move back to their small hometown in the American South in the 1930s. They want to open a blues club and start a new life. But something evil has been hiding in the town for a long time. Vampires come out and start going after the people they care about. The brothers have to fight to keep everyone alive." },
      { title: "The Lost Bus", image: "https://image.tmdb.org/t/p/w500/zpygCOYY1DPBkeUsrrznLRN5js5.jpg", description: "Based on a true story. In 2018, a wildfire breaks out in the town of Paradise, California and spreads fast. A school bus driver named Kevin McKay and a teacher named Mary Ludwig are trapped on the bus with 22 children. The roads are blocked by flames and fallen trees, and they have to find a way out before the fire closes in around them." },
    ],
  },
  {
    name: "Best Live Action Short",
    icon: "🎞️",
    nominees: [
      { title: "A Friend of Dorothy", image: "https://image.tmdb.org/t/p/w500/5YjFZoCfBJ2G40SHPa5CFy60jdC.jpg", description: "A lonely old widow named Dorothy lives alone and spends her days doing crosswords and taking pills. When a seventeen-year-old boy named JJ kicks his football into her garden, they become friends. Even though they seem very different, they find out they have a lot in common and help each other in ways they did not expect." },
      { title: "Butcher's Stain", image: "https://image.tmdb.org/t/p/w500/lAcOUxQUFP6lruP8e8nZSFBFjZ1.jpg", description: "Samir is an Arab Israeli who works in a supermarket in Tel Aviv. After hostage posters go missing from the break room, his manager blames him even though he did not do it. With his job on the line and people around him already looking at him differently, Samir has to find a way to clear his name." },
      { title: "Jane Austen's Period Drama", image: "https://image.tmdb.org/t/p/w500/tlQfsrxKLdrpQBlWUrUlpTamOBy.jpg", description: "Set in England in 1813. In the middle of a marriage proposal, a woman named Miss Estrogenia gets her period. Her suitor, Mr. Dickley, sees the blood and thinks she is hurt. What follows is a series of funny mix-ups and honest conversations about something no one in that time would talk about." },
      { title: "The Singers", image: "https://image.tmdb.org/t/p/w500/uxWXkcg5dV3VT240lCGQpZrARTs.jpg", description: "Inside a small, beat-up pub, a group of regular men who do not have much going for them start taking turns singing for each other. What begins as a simple contest turns into something bigger as each man pours out what he has been carrying inside. Based on a short story by Ivan Turgenev." },
      { title: "Two People Exchanging Saliva", image: "https://image.tmdb.org/t/p/w500/1Hi01LzZFpopWzNRlPBGsAdmoBI.jpg", description: "Set in a world where kissing is against the law and people pay for things by getting slapped in the face. A woman named Angine keeps coming back to a department store where she becomes drawn to a young salesgirl named Malaise. The two of them try to find a way to be together even though it could cost them everything." },
    ],
  },
  {
    name: "Best Animated Short",
    icon: "🦋",
    nominees: [
      { title: "Butterfly", image: "https://image.tmdb.org/t/p/w500/24rb1DaPwGTolrXzC0qOSicm5zr.jpg", description: "Based on the true story of Alfred Nakache, a Jewish French swimmer who competed in the 1936 Olympics in Nazi Germany. During the war, he was sent to Auschwitz where he lost his wife and daughter. The film shows him swimming as memories from his life come back to him." },
      { title: "Forevergreen", image: "https://image.tmdb.org/t/p/w500/7U38zSz4f6OOcHUpi5dJQfMcSw6.jpg", description: "A young bear cub who has lost his parents finds a home with a big, caring tree in the forest. The two become close, but when the cub discovers trash left by humans, he is drawn to it and starts wandering away. He has to learn what really matters before it is too late." },
      { title: "Retirement Plan", image: "https://image.tmdb.org/t/p/w500/lRkotrMJJNyOXBZE4i4s8vfXPTh.jpg", description: "A middle-aged man named Ray is tired and worn out from everyday life. He spends his time dreaming about all the things he wants to do when he retires, like writing poetry, growing vegetables, and going on adventures. The list keeps growing, and it slowly says more about who he is right now than who he hopes to be." },
      { title: "The Girl Who Cried Pearls", image: "https://image.tmdb.org/t/p/w500/sqdqvstmM2vOBnb5beVT8lOQ4Oi.jpg", description: "In Montreal at the start of the 1900s, a poor boy meets a girl whose tears turn into real pearls. He sells the pearls to a greedy pawnbroker who wants more and more. The boy has to choose between the money the pearls bring and the girl he cares about." },
      { title: "The Three Sisters", image: "https://image.tmdb.org/t/p/w500/86D5GyOvbnpCGDyzP3ls1Et8Bdu.jpg", description: "Three older sisters live alone in separate houses on a quiet, remote island. Their days follow the same calm routine until a sailor shows up and rents one of the cottages. His arrival shakes things up and brings out a side of the sisters that none of them expected." },
    ],
  },
  {
    name: "Best Documentary Short",
    icon: "📹",
    nominees: [
      { title: "All the Empty Rooms", image: "https://image.tmdb.org/t/p/w500/38odJEJiluUBLI58tO6oTmv5wZl.jpg", description: "A reporter and a photographer spend seven years visiting the bedrooms of children who were killed in school shootings across the United States. The rooms are still filled with toys, posters, and personal things left behind. The families open their doors and share their stories." },
      { title: "Armed Only with a Camera", image: "https://image.tmdb.org/t/p/w500/1vG68YrQGAEnCQooXrEvJ2eparK.jpg", description: "Brent Renaud was an American filmmaker and journalist who spent years covering wars and crises around the world with his brother Craig. In 2022, while reporting on the war in Ukraine, Brent was shot and killed by Russian soldiers. His brother finished this film about Brent's life and the work he left behind." },
      { title: "Children No More", image: "https://image.tmdb.org/t/p/w500/e5FPUMkTd2aHXtpSd5UZR3jAHHk.jpg", description: "A small group of Israeli women stand in a public square in Tel Aviv holding photographs of children who were killed in Gaza. Each photo shows the child's name, age, and the words were and are gone. Some people passing by stop and look, while others turn away or push back against what the women are doing." },
      { title: "The Devil Is Busy", image: "https://image.tmdb.org/t/p/w500/75GH49xL5kEzyYeXGiOPy2FIZGe.jpg", description: "Tracii is the head of security at a women's health clinic in Atlanta. Every day she checks the building, watches over the patients, and deals with protesters gathered outside. The film follows her through one day as she works to keep everyone safe in a place that is always under pressure." },
      { title: "Perfectly a Strangeness", image: "https://image.tmdb.org/t/p/w500/biPnnMyECGRhtUj5zGg7T7XSCk7.jpg", description: "Three donkeys wander through a bright, empty desert and stumble upon an abandoned building that used to be an observatory for studying the stars. With no words spoken, the film shows the world through their eyes as they explore the space and the light and shadows inside it." },
    ],
  },
  {
    name: "Best Casting",
    icon: "🎯",
    nominees: [
      { title: "Hamnet", image: "https://image.tmdb.org/t/p/w500/61xMzN4h8iLk0hq6oUzr9Ts6GE9.jpg", description: "The wife of William Shakespeare raises their children while he works far away in London. When their young son Hamnet gets sick, the family has to deal with a loss that changes them forever. Set in England in the 1590s." },
      { title: "Marty Supreme", image: "https://image.tmdb.org/t/p/w500/firAhZA0uQvRL2slp7v3AnOj0ZX.jpg", description: "Based on a real person named Marty Reisman who was one of the best ping-pong players in New York City in the 1950s. He spent his days playing in small clubs around the city, going up against anyone who would challenge him." },
      { title: "One Battle After Another", image: "https://image.tmdb.org/t/p/w500/m1jFoahEbeQXtx4zArT2FKdbNIj.jpg", description: "A family in Los Angeles in the 1970s runs a big business. The father is in charge, but the people around him all want more. His right-hand man has plans of his own, and a new person shows up who wants a seat at the table. The story follows what happens to each of them as things start to fall apart." },
      { title: "Sinners", image: "https://image.tmdb.org/t/p/w500/lOfjeJMKS7cOaaTn6q3J0y2ypiA.jpg", description: "Two twin brothers move back to their small hometown in the American South in the 1930s. They want to open a blues club and start a new life. But something evil has been hiding in the town for a long time. Vampires come out and start going after the people they care about. The brothers have to fight to keep everyone alive." },
      { title: "The Secret Agent", image: "https://image.tmdb.org/t/p/w500/rZqolYhxMEe6TZZTjSmFw9crDTD.jpg", description: "Based on a true story. A man goes undercover to get close to dangerous criminals in Brazil. The longer he pretends to be someone else, the harder it gets to remember who he really is." },
    ],
  },
];

export const ceremonyInfo = {
  name: "98th Academy Awards",
  date: "March 15, 2026",
  host: "Conan O'Brien",
  nominationsAnnouncement: "January 22, 2026",
  venue: "Dolby Theatre, Hollywood",
};

export function findOtherNominations(title: string, currentCategory: string): string[] {
  return categories
    .filter(cat => cat.name !== currentCategory)
    .filter(cat => cat.nominees.some(n =>
      n.title === title || n.details?.includes(title) || n.title.includes(title)
    ))
    .map(cat => cat.name);
}
