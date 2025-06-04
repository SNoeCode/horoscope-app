  const [birthday, setBirthday] = useState({ day: '', month: '', year: '' });
  const [selectedSign, setSelectedSign] = useState(null);

  const zodiacSigns = [
    { name: 'Aries', dates: [3, 21, 4, 19], symbol: '♈' },
    { name: 'Taurus', dates: [4, 20, 5, 20], symbol: '♉' },
    { name: 'Gemini', dates: [5, 21, 6, 20], symbol: '♊' },
    { name: 'Cancer', dates: [6, 21, 7, 22], symbol: '♋' },
    { name: 'Leo', dates: [7, 23, 8, 22], symbol: '♌' },
    { name: 'Virgo', dates: [8, 23, 9, 22], symbol: '♍' },
    { name: 'Libra', dates: [9, 23, 10, 22], symbol: '♎' },
    { name: 'Scorpio', dates: [10, 23, 11, 21], symbol: '♏' },
    { name: 'Sagittarius', dates: [11, 22, 12, 21], symbol: '♐' },
    { name: 'Capricorn', dates: [12, 22, 1, 19], symbol: '♑' },
    { name: 'Aquarius', dates: [1, 20, 2, 18], symbol: '♒' },
    { name: 'Pisces', dates: [2, 19, 3, 20], symbol: '♓' }
  ];

