// ===== Quiz-Duell Fragenkatalog =====
// Jede Frage: {q, a (Antworten-Array), c (Index der korrekten), diff (1-3)}
// Reines Wissensspiel (Skill) – kein Glücksspiel.

const QUESTION_BANK = {
  "allgemein": {
    name: "Allgemeinwissen", emoji: "🌍",
    questions: [
      {q:"Wie viele Kontinente gibt es auf der Erde?", a:["6","7","5","8"], c:1, diff:1},
      {q:"Welches ist das grösste Land der Welt nach Fläche?", a:["China","USA","Russland","Kanada"], c:2, diff:1},
      {q:"Wer schrieb 'Romeo und Julia'?", a:["Charles Dickens","William Shakespeare","Goethe","Homer"], c:1, diff:1},
      {q:"Was ist die Hauptstadt von Australien?", a:["Sydney","Melbourne","Canberra","Perth"], c:2, diff:2},
      {q:"Wie viele Bundesländer hat Deutschland?", a:["14","16","15","18"], c:1, diff:1},
      {q:"In welchem Jahr fiel die Berliner Mauer?", a:["1987","1989","1991","1990"], c:1, diff:1},
      {q:"Welcher Planet ist der Sonne am nächsten?", a:["Venus","Erde","Merkur","Mars"], c:2, diff:1},
      {q:"Wer malte die Mona Lisa?", a:["Michelangelo","Raphael","Leonardo da Vinci","Van Gogh"], c:2, diff:1},
      {q:"Wie heisst die älteste Universität der Welt (bis heute aktiv)?", a:["Oxford","Bologna","Harvard","Sorbonne"], c:1, diff:3},
      {q:"Welches Element hat das chemische Symbol 'Fe'?", a:["Fluor","Eisen","Flerovium","Silber"], c:1, diff:2},
      {q:"Wie viele Minuten hat ein Tag?", a:["1440","1380","1500","1260"], c:0, diff:2},
      {q:"Was ist das kleinste Land der Welt?", a:["Monaco","Luxemburg","Vatikanstadt","San Marino"], c:2, diff:2},
      {q:"In welchem Ozean liegt die Insel Madagaskar?", a:["Atlantik","Pazifik","Indischer Ozean","Arktik"], c:2, diff:2},
      {q:"Wie heisst der höchste Berg der Welt?", a:["K2","Kilimandscharo","Mount Everest","Mont Blanc"], c:2, diff:1},
      {q:"Welches Land hat die meisten Einwohner?", a:["Indien","China","USA","Indonesien"], c:0, diff:2},
    ]
  },
  "geografie": {
    name: "Geografie", emoji: "🗺️",
    questions: [
      {q:"An welchem Fluss liegt Paris?", a:["Rhein","Seine","Loire","Rhône"], c:1, diff:1},
      {q:"Welches ist der längste Fluss der Welt?", a:["Amazonas","Nil","Mississippi","Jangtse"], c:1, diff:2},
      {q:"Welche Wüste liegt in Nordafrika?", a:["Gobi","Sahara","Atacama","Kalahari"], c:1, diff:1},
      {q:"Wie viele Kantone hat die Schweiz?", a:["26","25","28","24"], c:0, diff:1},
      {q:"Was ist die Hauptstadt von Kanada?", a:["Toronto","Vancouver","Ottawa","Montreal"], c:2, diff:2},
      {q:"Welcher See ist der grösste der Schweiz?", a:["Genfersee","Bodensee","Vierwaldstättersee","Neuenburgersee"], c:0, diff:2},
      {q:"Welches Land hat die Form eines Stiefels?", a:["Griechenland","Spanien","Italien","Portugal"], c:2, diff:1},
      {q:"Was ist die Hauptstadt von Brasilien?", a:["Rio de Janeiro","São Paulo","Brasília","Salvador"], c:2, diff:2},
      {q:"Auf welchem Kontinent liegt das Land Chile?", a:["Asien","Südamerika","Europa","Afrika"], c:1, diff:1},
      {q:"Welche dieser Städte liegt NICHT in Europa?", a:["Wien","Brüssel","Kairo","Lissabon"], c:2, diff:1},
      {q:"Zwischen welchen zwei Ländern liegt die Schweiz?", a:["DE und AT","FR und IT","DE/FR/IT/AT","ES und PT"], c:2, diff:1},
      {q:"Welche ist die grösste Insel der Welt?", a:["Borneo","Grönland","Madagaskar","Sumatra"], c:1, diff:2},
    ]
  },
  "sport": {
    name: "Sport", emoji: "🏆",
    questions: [
      {q:"Wie viele Spieler hat eine Volleyballmannschaft auf dem Feld?", a:["5","6","7","4"], c:1, diff:1},
      {q:"Welches Land hat die Fussball-WM 2022 gewonnen?", a:["Frankreich","Brasilien","Argentinien","Deutschland"], c:2, diff:1},
      {q:"Wie viele Punkte bringt ein Touchdown im American Football?", a:["3","6","7","5"], c:1, diff:2},
      {q:"Welcher Tennisspieler gewann die meisten Grand-Slam-Titel?", a:["Roger Federer","Rafael Nadal","Novak Djokovic","Pete Sampras"], c:2, diff:3},
      {q:"Bei wie vielen Grossen (hier: Olympische Ringe) laufen die Olympischen Spiele?", a:["Wozu diese Frage... 5","4","6","3"], c:0, diff:3},
      {q:"Wie lange dauert ein reguläres Fussballspiel?", a:["80 Min","90 Min","100 Min","60 Min"], c:1, diff:1},
      {q:"Welcher Schweizer hat die Tour de France gewonnen?", a:["Ferdi Kübler","Hugo Koblet","Beide","Pascal Richard"], c:2, diff:3},
      {q:"Wie viele Sätze braucht man im Tennis (Grand Slam Herren) zum Sieg?", a:["2","3","4","1"], c:1, diff:2},
      {q:"In welchem Sport gibt es den 'Slam Dunk'?", a:["Handball","Basketball","Volleyball","Eishockey"], c:1, diff:1},
      {q:"Wie viele Mitglieder hat eine Basketballmannschaft auf dem Feld?", a:["5","6","7","4"], c:0, diff:1},
    ]
  },
  "geschichte": {
    name: "Geschichte", emoji: "📜",
    questions: [
      {q:"In welchem Jahr begann der Zweite Weltkrieg?", a:["1937","1939","1941","1944"], c:1, diff:1},
      {q:"Wer war der erste Mensch auf dem Mond?", a:["Buzz Aldrin","Neil Armstrong","Yuri Gagarin","Michael Collins"], c:1, diff:1},
      {q:"In welchem Jahr wurde die Schweiz gegründet?", a:["1291","1848","1798","1918"], c:0, diff:2},
      {q:"Wer war der erste römische Kaiser?", a:["Julius Cäsar","Augustus","Nero","Trajan"], c:1, diff:3},
      {q:"Welches Reich baute die Pyramiden von Gizeh?", a:["Römer","Griechen","Ägypter","Perser"], c:2, diff:1},
      {q:"In welchem Jahr wurde die EU gegründet (EGKS, 1951)?", a:["1948","1951","1957","1963"], c:1, diff:3},
      {q:"Wer entdeckte 1492 Amerika (für Europa)?", a:["Magellan","Vasco da Gama","Kolumbus","Pizarro"], c:2, diff:1},
      {q:"Welche Mauer trennte Ost- und West-Berlin?", a:["Chinesische Mauer","Berliner Mauer","Hadrianswall","Zäune"], c:1, diff:1},
    ]
  },
  "wissen-technik": {
    name: "Wissen & Technik", emoji: "🧠",
    questions: [
      {q:"Wer entwickelte die Relativitätstheorie?", a:["Newton","Einstein","Hawking","Planck"], c:1, diff:1},
      {q:"Was bedeutet 'WWW'?", a:["World Wide Web","Web World Wide","Whole Web World","World Web Wide"], c:0, diff:1},
      {q:"Wie viele Bits sind ein Byte?", a:["4","8","16","32"], c:1, diff:1},
      {q:"Was ist die kleinste Einheit eines digitalen Bildes?", a:["Pixel","Bitmap","Vektor","Frame"], c:0, diff:2},
      {q:"Welches Unternehmen entwickelte das Betriebssystem Windows?", a:["Apple","Google","Microsoft","IBM"], c:2, diff:1},
      {q:"Was misst ein Barometer?", a:["Temperatur","Luftdruck","Feuchtigkeit","Wind"], c:1, diff:2},
      {q:"Welche Einheit misst elektrischen Strom?", a:["Volt","Watt","Ampere","Ohm"], c:2, diff:2},
      {q:"Wofür steht 'AI' im Englischen?", a:["Advanced Internet","Artificial Intelligence","Automated Interface","Analytical Input"], c:1, diff:1},
      {q:"Welches ist das am häufigsten gesprochene Programmiersprachen-Paar?", a:["Java & C++","Python & JavaScript","Go & Rust","PHP & Perl"], c:1, diff:2},
    ]
  },
  "musik": {
    name: "Musik", emoji: "🎵",
    questions: [
      {q:"Wie viele Saiten hat eine Standard-Gitarre?", a:["4","5","6","7"], c:2, diff:1},
      {q:"Wer war 'The King of Pop'?", a:["Elvis Presley","Michael Jackson","Prince","Freddie Mercury"], c:1, diff:1},
      {q:"Welche Band sang 'Bohemian Rhapsody'?", a:["The Beatles","Queen","Led Zeppelin","Pink Floyd"], c:1, diff:1},
      {q:"Wie heisst der Sänger von 'In Flames' (bekannt in der Metalwelt)?", a:["Anders Fridén","Björn Gelotte","James Hetfield","Till Lindemann"], c:0, diff:3},
      {q:"Wie viele Noten hat eine Oktave?", a:["5","6","7","8"], c:2, diff:2},
      {q:"Wer komponierte die 'Neunte Symphonie'?", a:["Mozart","Beethoven","Bach","Schubert"], c:1, diff:2},
    ]
  },
  "filme": {
    name: "Film & TV", emoji: "🎬",
    questions: [
      {q:"Wie heisst der Zauberer in 'Harry Potter' als Hauptfigur?", a:["Hermine","Ron","Harry","Dumbledore"], c:2, diff:1},
      {q:"Welcher Schauspieler spielte Jack in 'Titanic'?", a:["Brad Pitt","Leonardo DiCaprio","Tom Cruise","Johnny Depp"], c:1, diff:1},
      {q:"Was ist der Name des Dinosaurierparks?", a:["Jurassic Park","Dino World","Park der Dinos","Urzeit Park"], c:0, diff:1},
      {q:"Wie viele Avengers-Filme gibt es (Hauptreihe, Infinity-Saga)?", a:["3","4","5","2"], c:1, diff:3},
      {q:"Welcher Film gewann den Oscar 'Bester Film' 2020?", a:["1917","Parasite","Joker","Once Upon a Time"], c:1, diff:3},
    ]
  }
};
