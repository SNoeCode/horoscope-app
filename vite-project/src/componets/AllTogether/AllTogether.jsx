import React, { useState } from 'react';

const AllTogether = () => {
  const [birthday, setBirthday] = useState({ day: '', month: '', year: '' });
  const [selectedSign, setSelectedSign] = useState(null);
const zodiacData = {
  "aries": {
    "sign": "Aries",
    "symbol": "♈",
    "element": "Fire",
    "quality": "Cardinal",
    "rulingPlanet": "Mars",
    "dates": "March 21 - April 19",
    "personality": {
      "overview": "Aries are natural-born leaders who are bold, ambitious, and always ready to take on new challenges. They possess incredible energy and enthusiasm that inspires others around them.",
      "coreTraits": ["Leadership", "Courage", "Initiative", "Enthusiasm", "Independence", "Competitiveness", "Spontaneity"],
      "strengths": ["Natural leadership abilities", "Fearless in facing challenges", "High energy and motivation", "Quick decision-making", "Pioneering spirit", "Honest and direct communication"],
      "weaknesses": ["Impulsive behavior", "Short temper", "Impatience", "Can be selfish", "Difficulty with long-term planning", "May rush into situations without thinking"]
    },
    "temperament": {
      "dominant": "Choleric",
      "description": "High-energy, driven, and passionate. Aries tend to be quick to act and react, with intense emotions that burn bright but may not last long.",
      "emotionalPattern": "Quick to anger, quick to forgive. Passionate and intense but moves on rapidly from conflicts."
    },
    "careers": {
      "idealOccupations": ["Entrepreneur", "Military Officer", "Sales Manager", "Emergency Response", "Sports Coach", "Project Manager", "Surgeon", "Police Officer"],
      "industries": ["Business & Entrepreneurship", "Sports & Fitness", "Emergency Services", "Sales & Marketing", "Healthcare", "Military & Security"],
      "workStyle": "Thrives in fast-paced, challenging environments where they can lead and make quick decisions. Prefers independence and autonomy."
    },
    "relationships": {
      "bestMatches": ["Leo", "Sagittarius", "Gemini", "Aquarius"],
      "challenging": ["Cancer", "Capricorn"],
      "loveStyle": "Passionate, direct, and intense. Aries dive headfirst into relationships with enthusiasm and expect the same energy in return."
    },
    "health": {
      "strengths": ["High energy levels", "Strong immune system", "Quick recovery"],
      "vulnerabilities": ["Head injuries", "Stress-related issues", "Burnout from overexertion"],
      "recommendations": ["Regular intense exercise", "Stress management", "Adequate rest despite high energy"]
    },
    "life_path": "Aries are meant to be trailblazers and initiators. Their life purpose often involves breaking new ground, leading others, and having the courage to venture into uncharted territory."
  },
  "taurus": {
    "sign": "Taurus",
    "symbol": "♉",
    "element": "Earth",
    "quality": "Fixed",
    "rulingPlanet": "Venus",
    "dates": "April 20 - May 20",
    "personality": {
      "overview": "Taurus individuals are known for their reliability, practicality, and love of comfort and luxury. They value stability and security above all else and approach life with patience and determination.",
      "coreTraits": ["Reliability", "Patience", "Practicality", "Determination", "Loyalty", "Sensuality", "Stubbornness"],
      "strengths": ["Extremely reliable and trustworthy", "Patient and persistent", "Great with finances", "Appreciates beauty and art", "Strong work ethic", "Loyal friend and partner"],
      "weaknesses": ["Can be overly stubborn", "Resistant to change", "Materialistic tendencies", "May be possessive", "Slow to adapt", "Can hold grudges"]
    },
    "temperament": {
      "dominant": "Phlegmatic",
      "description": "Calm, steady, and even-tempered. Taurus individuals are known for their emotional stability and peaceful nature, though they can become immovable when pushed.",
      "emotionalPattern": "Slow to anger but explosive when pushed too far. Generally calm and steady with deep, lasting emotions."
    },
    "careers": {
      "idealOccupations": ["Financial Advisor", "Chef", "Interior Designer", "Banker", "Real Estate Agent", "Farmer", "Artist", "Luxury Goods Sales"],
      "industries": ["Finance & Banking", "Culinary Arts", "Real Estate", "Agriculture", "Art & Design", "Luxury Retail"],
      "workStyle": "Prefers stable, secure work environments with clear expectations. Excels in roles requiring patience, attention to detail, and long-term planning."
    },
    "relationships": {
      "bestMatches": ["Virgo", "Capricorn", "Cancer", "Pisces"],
      "challenging": ["Leo", "Aquarius"],
      "loveStyle": "Loyal, devoted, and sensual. Taurus seeks long-term, stable relationships and expresses love through physical affection and material gifts."
    },
    "health": {
      "strengths": ["Generally robust health", "Good endurance", "Strong constitution"],
      "vulnerabilities": ["Throat and neck issues", "Weight gain from love of food", "Circulation problems"],
      "recommendations": ["Regular moderate exercise", "Balanced diet despite love of indulgence", "Attention to neck and throat health"]
    },
    "life_path": "Taurus is meant to build lasting foundations and appreciate the beauty in life. Their purpose often involves creating stability, cultivating resources, and helping others find security and comfort."
  },
  "gemini": {
    "sign": "Gemini",
    "symbol": "♊",
    "element": "Air",
    "quality": "Mutable",
    "rulingPlanet": "Mercury",
    "dates": "May 21 - June 20",
    "personality": {
      "overview": "Gemini individuals are intellectually curious, adaptable, and excellent communicators. They thrive on variety and mental stimulation, often juggling multiple interests and projects simultaneously.",
      "coreTraits": ["Communication", "Adaptability", "Curiosity", "Wit", "Versatility", "Intelligence", "Restlessness"],
      "strengths": ["Excellent communication skills", "Quick learner", "Adaptable to change", "Great sense of humor", "Intellectually curious", "Social and charming"],
      "weaknesses": ["Can be superficial", "Inconsistent", "Indecisive", "May spread themselves too thin", "Tendency to gossip", "Difficulty with commitment"]
    },
    "temperament": {
      "dominant": "Sanguine",
      "description": "Quick-witted, social, and mentally agile. Geminis are naturally optimistic and enthusiastic, with a childlike curiosity about the world.",
      "emotionalPattern": "Emotions change quickly like the weather. Generally upbeat but can become anxious or scattered when overwhelmed."
    },
    "careers": {
      "idealOccupations": ["Journalist", "Teacher", "Sales Representative", "Translator", "Social Media Manager", "Writer", "Public Relations", "Software Developer"],
      "industries": ["Media & Communications", "Education", "Technology", "Publishing", "Marketing", "Translation Services"],
      "workStyle": "Needs variety and mental stimulation. Excels in roles requiring communication, learning new things, and connecting with people."
    },
    "relationships": {
      "bestMatches": ["Libra", "Aquarius", "Aries", "Leo"],
      "challenging": ["Virgo", "Pisces"],
      "loveStyle": "Intellectual connection is crucial. Gemini needs mental stimulation and variety in relationships, preferring partners who can engage in witty conversation."
    },
    "health": {
      "strengths": ["Generally good immunity", "Quick recovery", "Mental resilience"],
      "vulnerabilities": ["Respiratory issues", "Nervous system disorders", "Anxiety and stress"],
      "recommendations": ["Breathing exercises", "Mental relaxation techniques", "Regular communication and social interaction"]
    },
    "life_path": "Gemini is meant to be a bridge between different worlds and ideas. Their purpose involves communication, learning, teaching, and helping others connect and understand each other."
  },
  "cancer": {
    "sign": "Cancer",
    "symbol": "♋",
    "element": "Water",
    "quality": "Cardinal",
    "rulingPlanet": "Moon",
    "dates": "June 21 - July 22",
    "personality": {
      "overview": "Cancer individuals are deeply emotional, intuitive, and nurturing. They value family, home, and emotional security above all else, and have a natural ability to care for and protect others.",
      "coreTraits": ["Nurturing", "Intuition", "Emotional Depth", "Loyalty", "Protectiveness", "Sensitivity", "Imagination"],
      "strengths": ["Highly intuitive", "Excellent caregiver", "Emotionally intelligent", "Loyal and devoted", "Creative and imaginative", "Strong family values"],
      "weaknesses": ["Overly emotional", "Moody", "Can be clingy", "Holds onto past hurts", "Indirect communication", "Fear of rejection"]
    },
    "temperament": {
      "dominant": "Melancholic",
      "description": "Deeply emotional and sensitive to their environment. Cancers feel everything intensely and have rich inner emotional lives.",
      "emotionalPattern": "Emotions run deep and last long. Mood changes with phases like the moon. Highly empathetic to others' feelings."
    },
    "careers": {
      "idealOccupations": ["Nurse", "Social Worker", "Therapist", "Chef", "Interior Designer", "Teacher", "Childcare Provider", "Museum Curator"],
      "industries": ["Healthcare", "Social Services", "Education", "Hospitality", "Real Estate", "Food & Beverage"],
      "workStyle": "Thrives in supportive, family-like work environments. Excels in caring professions and roles that involve helping others."
    },
    "relationships": {
      "bestMatches": ["Scorpio", "Pisces", "Taurus", "Virgo"],
      "challenging": ["Aries", "Libra"],
      "loveStyle": "Seeks deep emotional connection and security. Cancer loves deeply and wants to nurture and be nurtured in return."
    },
    "health": {
      "strengths": ["Strong intuition about health needs", "Good recovery when feeling secure", "Natural healing abilities"],
      "vulnerabilities": ["Digestive issues", "Breast health concerns", "Emotional eating"],
      "recommendations": ["Stress management", "Healthy eating habits", "Regular emotional check-ins"]
    },
    "life_path": "Cancer is meant to nurture and heal. Their purpose often involves caring for others, preserving traditions, and creating safe, loving environments for people to grow and thrive."
  },
  "leo": {
    "sign": "Leo",
    "symbol": "♌",
    "element": "Fire",
    "quality": "Fixed",
    "rulingPlanet": "Sun",
    "dates": "July 23 - August 22",
    "personality": {
      "overview": "Leo individuals are confident, charismatic, and natural performers. They love being in the spotlight, have generous hearts, and inspire others with their warmth and enthusiasm.",
      "coreTraits": ["Confidence", "Charisma", "Generosity", "Creativity", "Leadership", "Drama", "Loyalty"],
      "strengths": ["Natural leadership abilities", "Confident and charismatic", "Generous and warm-hearted", "Creative and artistic", "Loyal to loved ones", "Inspiring to others"],
      "weaknesses": ["Can be egotistical", "Needs constant attention", "Dramatic tendencies", "Stubborn", "Can be domineering", "Sensitive to criticism"]
    },
    "temperament": {
      "dominant": "Choleric-Sanguine",
      "description": "Warm, generous, and naturally magnetic. Leos have sunny dispositions but can become dramatic when their pride is wounded.",
      "emotionalPattern": "Generally optimistic and warm, but can become dramatically upset when feeling unappreciated or criticized."
    },
    "careers": {
      "idealOccupations": ["Actor", "CEO", "Event Planner", "Public Relations", "Teacher", "Politician", "Artist", "Entertainment Industry"],
      "industries": ["Entertainment", "Politics", "Education", "Luxury Goods", "Fashion", "Management"],
      "workStyle": "Needs recognition and appreciation. Excels in leadership roles and positions where they can inspire and motivate others."
    },
    "relationships": {
      "bestMatches": ["Aries", "Sagittarius", "Gemini", "Libra"],
      "challenging": ["Taurus", "Scorpio"],
      "loveStyle": "Romantic, generous, and passionate. Leo loves grand gestures and wants to be admired and appreciated by their partner."
    },
    "health": {
      "strengths": ["Generally robust health", "Strong heart", "Good vitality"],
      "vulnerabilities": ["Heart conditions", "Back problems", "Stress from overwork"],
      "recommendations": ["Regular cardiovascular exercise", "Back care and posture attention", "Balance work with play"]
    },
    "life_path": "Leo is meant to shine and inspire others. Their purpose involves leadership, creativity, and bringing joy and warmth to the world through their unique talents and generous spirit."
  },
  "virgo": {
    "sign": "Virgo",
    "symbol": "♍",
    "element": "Earth",
    "quality": "Mutable",
    "rulingPlanet": "Mercury",
    "dates": "August 23 - September 22",
    "personality": {
      "overview": "Virgo individuals are analytical, practical, and perfectionistic. They have a keen eye for detail, strong organizational skills, and a genuine desire to help and serve others.",
      "coreTraits": ["Analysis", "Perfectionism", "Service", "Organization", "Practicality", "Modesty", "Reliability"],
      "strengths": ["Excellent attention to detail", "Highly organized", "Practical problem-solver", "Reliable and hardworking", "Analytical mind", "Helpful and service-oriented"],
      "weaknesses": ["Overly critical", "Perfectionist tendencies", "Worry and anxiety", "Can be nitpicky", "Self-critical", "Difficulty relaxing"]
    },
    "temperament": {
      "dominant": "Melancholic",
      "description": "Thoughtful, analytical, and detail-oriented. Virgos tend to be introspective and can be their own harshest critics.",
      "emotionalPattern": "Steady but prone to worry and overthinking. Emotions are often internalized and analyzed rather than openly expressed."
    },
    "careers": {
      "idealOccupations": ["Healthcare Professional", "Accountant", "Editor", "Researcher", "Quality Control", "Nutritionist", "Administrative Assistant", "Analyst"],
      "industries": ["Healthcare", "Finance", "Research", "Publishing", "Quality Assurance", "Service Industries"],
      "workStyle": "Excels in detail-oriented work requiring precision and organization. Prefers structured environments with clear procedures."
    },
    "relationships": {
      "bestMatches": ["Taurus", "Capricorn", "Cancer", "Scorpio"],
      "challenging": ["Gemini", "Sagittarius"],
      "loveStyle": "Practical and devoted. Virgo shows love through acts of service and taking care of their partner's needs."
    },
    "health": {
      "strengths": ["Health-conscious", "Good self-care habits", "Attention to nutrition"],
      "vulnerabilities": ["Digestive issues", "Anxiety disorders", "Obsessive-compulsive tendencies"],
      "recommendations": ["Stress reduction techniques", "Regular health check-ups", "Balance perfectionism with self-acceptance"]
    },
    "life_path": "Virgo is meant to serve and heal. Their purpose involves helping others improve their lives through practical assistance, health, and bringing order to chaos."
  },
  "libra": {
    "sign": "Libra",
    "symbol": "♎",
    "element": "Air",
    "quality": "Cardinal",
    "rulingPlanet": "Venus",
    "dates": "September 23 - October 22",
    "personality": {
      "overview": "Libra individuals are diplomatic, charming, and seek harmony in all aspects of life. They have a natural sense of justice, appreciate beauty, and excel at bringing people together.",
      "coreTraits": ["Diplomacy", "Balance", "Charm", "Justice", "Partnership", "Aesthetics", "Indecision"],
      "strengths": ["Excellent mediator", "Charming and social", "Fair and just", "Appreciates beauty", "Good partnership skills", "Natural peacemaker"],
      "weaknesses": ["Indecisive", "Avoids confrontation", "Can be superficial", "People-pleasing", "Codependent tendencies", "Difficulty being alone"]
    },
    "temperament": {
      "dominant": "Sanguine",
      "description": "Social, charming, and seeks balance and harmony. Libras are generally pleasant and diplomatic but can become anxious when faced with conflict.",
      "emotionalPattern": "Seeks emotional equilibrium and can become distressed by discord. Generally optimistic but sensitive to relationship dynamics."
    },
    "careers": {
      "idealOccupations": ["Lawyer", "Diplomat", "Counselor", "Interior Designer", "Art Dealer", "Human Resources", "Judge", "Fashion Designer"],
      "industries": ["Law", "Diplomacy", "Arts & Design", "Human Resources", "Beauty & Fashion", "Counseling"],
      "workStyle": "Thrives in collaborative environments. Excels in roles requiring diplomacy, aesthetic sense, and people skills."
    },
    "relationships": {
      "bestMatches": ["Gemini", "Aquarius", "Leo", "Sagittarius"],
      "challenging": ["Cancer", "Capricorn"],
      "loveStyle": "Romantic and partnership-oriented. Libra seeks harmony and balance in relationships and loves romantic gestures."
    },
    "health": {
      "strengths": ["Generally balanced health", "Good social support system", "Aesthetic awareness of wellness"],
      "vulnerabilities": ["Kidney issues", "Lower back problems", "Stress from decision-making"],
      "recommendations": ["Regular exercise for balance", "Stress management", "Healthy relationship boundaries"]
    },
    "life_path": "Libra is meant to bring balance and harmony to the world. Their purpose involves creating beauty, fostering cooperation, and helping others find peaceful solutions to conflicts."
  },
  "scorpio": {
    "sign": "Scorpio",
    "symbol": "♏",
    "element": "Water",
    "quality": "Fixed",
    "rulingPlanet": "Pluto (traditional: Mars)",
    "dates": "October 23 - November 21",
    "personality": {
      "overview": "Scorpio individuals are intense, passionate, and mysterious. They possess incredible emotional depth, strong intuition, and the ability to transform themselves and others through profound experiences.",
      "coreTraits": ["Intensity", "Passion", "Mystery", "Transformation", "Intuition", "Determination", "Secrecy"],
      "strengths": ["Incredibly intuitive", "Emotionally deep", "Loyal and devoted", "Great investigative abilities", "Transformative power", "Strong willpower"],
      "weaknesses": ["Can be jealous", "Secretive", "Vindictive", "Obsessive", "Controlling", "Difficulty trusting others"]
    },
    "temperament": {
      "dominant": "Melancholic-Choleric",
      "description": "Deep, intense, and transformative. Scorpios feel everything at the deepest level and have powerful emotional undercurrents.",
      "emotionalPattern": "Emotions run extremely deep. Slow to trust but once committed, incredibly loyal. Can hold grudges but also capable of profound forgiveness."
    },
    "careers": {
      "idealOccupations": ["Psychologist", "Detective", "Surgeon", "Researcher", "Investigative Journalist", "Therapist", "Forensic Scientist", "Investment Banker"],
      "industries": ["Psychology", "Investigation", "Medicine", "Research", "Finance", "Occult Studies"],
      "workStyle": "Excels in roles requiring deep investigation, transformation, and dealing with life's mysteries. Prefers working independently or in small, trusted teams."
    },
    "relationships": {
      "bestMatches": ["Cancer", "Pisces", "Virgo", "Capricorn"],
      "challenging": ["Leo", "Aquarius"],
      "loveStyle": "All-or-nothing approach to love. Scorpio seeks deep, transformative relationships and can be intensely jealous but also incredibly loyal."
    },
    "health": {
      "strengths": ["Strong healing abilities", "Good at recovery", "High pain tolerance"],
      "vulnerabilities": ["Reproductive system issues", "Stress-related ailments", "Addiction tendencies"],
      "recommendations": ["Regular detoxification", "Emotional release work", "Healthy outlets for intensity"]
    },
    "life_path": "Scorpio is meant to transform and regenerate. Their purpose involves helping others through profound changes, uncovering hidden truths, and facilitating deep healing."
  },
  "sagittarius": {
    "sign": "Sagittarius",
    "symbol": "♐",
    "element": "Fire",
    "quality": "Mutable",
    "rulingPlanet": "Jupiter",
    "dates": "November 22 - December 21",
    "personality": {
      "overview": "Sagittarius individuals are adventurous, optimistic, and philosophical. They love to explore, learn, and share their knowledge with others, always seeking to expand their horizons.",
      "coreTraits": ["Adventure", "Optimism", "Philosophy", "Freedom", "Honesty", "Exploration", "Restlessness"],
      "strengths": ["Optimistic outlook", "Adventurous spirit", "Honest and direct", "Philosophical mind", "Great sense of humor", "Inspiring teacher"],
      "weaknesses": ["Can be tactless", "Commitment issues", "Impatient", "Over-promising", "Restless", "May be irresponsible"]
    },
    "temperament": {
      "dominant": "Sanguine",
      "description": "Optimistic, adventurous, and freedom-loving. Sagittarians are naturally enthusiastic and have an infectious zest for life.",
      "emotionalPattern": "Generally upbeat and optimistic. Quick to bounce back from setbacks. Can become restless or depressed when feeling confined."
    },
    "careers": {
      "idealOccupations": ["Travel Guide", "Teacher", "Philosopher", "International Business", "Publisher", "Outdoor Guide", "Foreign Correspondent", "University Professor"],
      "industries": ["Travel & Tourism", "Education", "Publishing", "International Trade", "Sports & Recreation", "Religious Organizations"],
      "workStyle": "Needs freedom and variety. Excels in roles involving travel, teaching, or exploring new ideas and cultures."
    },
    "relationships": {
      "bestMatches": ["Aries", "Leo", "Libra", "Aquarius"],
      "challenging": ["Virgo", "Pisces"],
      "loveStyle": "Values freedom and adventure in relationships. Sagittarius seeks partners who share their love of exploration and learning."
    },
    "health": {
      "strengths": ["Generally robust health", "Active lifestyle", "Good recovery abilities"],
      "vulnerabilities": ["Hip and thigh injuries", "Liver issues", "Accidents from risk-taking"],
      "recommendations": ["Regular physical activity", "Moderation in indulgences", "Safety awareness during adventures"]
    },
    "life_path": "Sagittarius is meant to seek and share wisdom. Their purpose involves teaching, exploring, and helping others expand their understanding of the world and themselves."
  },
  "capricorn": {
    "sign": "Capricorn",
    "symbol": "♑",
    "element": "Earth",
    "quality": "Cardinal",
    "rulingPlanet": "Saturn",
    "dates": "December 22 - January 19",
    "personality": {
      "overview": "Capricorn individuals are ambitious, disciplined, and practical. They are natural leaders who work steadily toward their goals and have a strong sense of responsibility and tradition.",
      "coreTraits": ["Ambition", "Discipline", "Responsibility", "Tradition", "Patience", "Authority", "Conservatism"],
      "strengths": ["Highly ambitious", "Excellent self-discipline", "Strong leadership", "Practical and realistic", "Responsible and reliable", "Good with long-term planning"],
      "weaknesses": ["Can be pessimistic", "Workaholic tendencies", "Rigid thinking", "Difficulty expressing emotions", "May be too serious", "Status-conscious"]
    },
    "temperament": {
      "dominant": "Melancholic",
      "description": "Serious, responsible, and goal-oriented. Capricorns are naturally conservative and prefer structure and tradition.",
      "emotionalPattern": "Emotions are carefully controlled and may be suppressed in favor of practical concerns. Deep feelings but difficulty expressing them."
    },
    "careers": {
      "idealOccupations": ["CEO", "Government Official", "Banker", "Architect", "Project Manager", "Financial Planner", "Judge", "Engineer"],
      "industries": ["Business Management", "Government", "Finance", "Construction", "Law", "Engineering"],
      "workStyle": "Excels in structured, hierarchical environments. Natural leader who works best with clear goals and established procedures."
    },
    "relationships": {
      "bestMatches": ["Taurus", "Virgo", "Scorpio", "Pisces"],
      "challenging": ["Aries", "Libra"],
      "loveStyle": "Traditional and committed. Capricorn takes relationships seriously and seeks long-term, stable partnerships."
    },
    "health": {
      "strengths": ["Good constitution", "Disciplined health habits", "Good longevity"],
      "vulnerabilities": ["Bone and joint issues", "Skin problems", "Depression from overwork"],
      "recommendations": ["Regular exercise for bone health", "Work-life balance", "Skin care attention"]
    },
    "life_path": "Capricorn is meant to build and achieve. Their purpose involves creating lasting structures, leading others to success, and establishing traditions that benefit future generations."
  },
  "aquarius": {
    "sign": "Aquarius",
    "symbol": "♒",
    "element": "Air",
    "quality": "Fixed",
    "rulingPlanet": "Uranus (traditional: Saturn)",
    "dates": "January 20 - February 18",
    "personality": {
      "overview": "Aquarius individuals are innovative, independent, and humanitarian. They are forward-thinking visionaries who value freedom and equality, often working to make the world a better place.",
      "coreTraits": ["Innovation", "Independence", "Humanitarianism", "Originality", "Rebellion", "Detachment", "Idealism"],
      "strengths": ["Highly innovative", "Independent thinker", "Humanitarian spirit", "Objective perspective", "Original ideas", "Friendly and social"],
      "weaknesses": ["Can be aloof", "Stubborn about beliefs", "Unpredictable", "Difficulty with emotions", "May be impractical", "Rebellious nature"]
    },
    "temperament": {
      "dominant": "Sanguine-Phlegmatic",
      "description": "Independent, innovative, and somewhat detached. Aquarians are friendly but maintain emotional distance, preferring intellectual connections.",
      "emotionalPattern": "Emotions are intellectualized rather than deeply felt. Friendly and social but can seem detached in intimate relationships."
    },
    "careers": {
      "idealOccupations": ["Scientist", "Social Worker", "Technology Developer", "Humanitarian", "Inventor", "Astrologer", "Environmental Activist", "IT Specialist"],
      "industries": ["Technology", "Science", "Social Services", "Environmental Organizations", "Innovation Labs", "Non-profits"],
      "workStyle": "Needs intellectual freedom and the ability to innovate. Excels in roles involving technology, social causes, or cutting-edge research."
    },
    "relationships": {
      "bestMatches": ["Gemini", "Libra", "Aries", "Sagittarius"],
      "challenging": ["Taurus", "Scorpio"],
      "loveStyle": "Values friendship and intellectual connection. Aquarius needs space and freedom in relationships and can seem emotionally detached."
    },
    "health": {
      "strengths": ["Good circulation", "Strong nervous system", "Innovative health approaches"],
      "vulnerabilities": ["Circulatory problems", "Ankle injuries", "Nervous disorders"],
      "recommendations": ["Regular cardiovascular exercise", "Ankle protection during activities", "Stress management for nervous system"]
    },
    "life_path": "Aquarius is meant to innovate and reform. Their purpose involves bringing new ideas to humanity, fighting for equality, and creating a better future for all."
  },
  "pisces": {
    "sign": "Pisces",
    "symbol": "♓",
    "element": "Water",
    "quality": "Mutable",
    "rulingPlanet": "Neptune (traditional: Jupiter)",
    "dates": "February 19 - March 20",
    "personality": {
      "overview": "Pisces individuals are compassionate, intuitive, and artistic. They are deeply empathetic and often psychic, with rich inner lives and a strong connection to the spiritual realm.",
      "coreTraits": ["Compassion", "Intuition", "Creativity", "Spirituality", "Empathy", "Imagination", "Escapism"],
      "strengths": ["Highly intuitive", "Compassionate and caring", "Artistic and creative", "Spiritually aware", "Adaptable", "Understanding of others"],
      "weaknesses": ["Overly emotional", "Escapist tendencies", "Difficulty with boundaries", "Can be impractical", "Victim mentality", "Addiction prone"]
    },
    "temperament": {
      "dominant": "Phlegmatic-Melancholic",
      "description": "Sensitive, dreamy, and deeply emotional. Pisceans are naturally empathetic and can absorb the emotions of those around them.",
      "emotionalPattern": "Emotions are deep and fluid like water. Highly empathetic to others' feelings, sometimes to their own detriment."
    },
    "careers": {
      "idealOccupations": ["Artist", "Therapist", "Nurse", "Musician", "Photographer", "Social Worker", "Spiritual Counselor", "Non-profit Worker"],
      "industries": ["Arts & Entertainment", "Healthcare", "Social Services", "Spiritual Organizations", "Photography", "Music"],
      "workStyle": "Needs emotionally fulfilling work that helps others. Excels in creative or healing professions that allow for flexibility and compassion."
    },
    "relationships": {
      "bestMatches": ["Cancer", "Scorpio", "Taurus", "Capricorn"],
      "challenging": ["Gemini", "Sagittarius"],
      "loveStyle": "Romantic, devoted, and self-sacrificing. Pisces loves unconditionally and often puts their partner's needs before their own."
    },
    "health": {
      "strengths": ["Strong healing abilities", "Intuitive about health needs", "Natural empathy aids in healing others"],
      "vulnerabilities": ["Prone to emotional overwhelm", "Susceptible to addiction", "Feet and immune system issues", "Mental health challenges"],
      "recommendations": ["Regular meditation and spiritual practices", "Boundary setting exercises", "Creative expression for emotional release", "Water-based activities for healing"]
    },
    "life_path": "Pisces is meant to heal, inspire, and guide through empathy and creativity, helping others connect with their emotions and inner truths."
  }
};

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

  const styles = {
    astrologyApp: {
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '20px'
    },
    appHeader: {
      textAlign: 'center',
      color: 'white',
      marginBottom: '30px',
      padding: '40px 20px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    appTitle: {
      fontSize: '3rem',
      marginBottom: '10px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      background: 'linear-gradient(45deg, #ffd700, #ffb347)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    appSubtitle: {
      fontSize: '1.2rem',
      opacity: '0.9'
    },
    birthdaySection: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '30px',
      marginBottom: '30px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    },
    birthdayTitle: {
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '1.8rem'
    },
    birthdayInputs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap',
      marginBottom: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    inputLabel: {
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#2c3e50',
      fontSize: '1.1rem'
    },
    inputField: {
      padding: '12px',
      border: '2px solid #ddd',
      borderRadius: '10px',
      fontSize: '16px',
      width: '80px',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    },
    matchedSign: {
      textAlign: 'center',
      padding: '20px',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      borderRadius: '15px',
      color: 'white',
      marginTop: '20px'
    },
    matchedText: {
      fontSize: '1.2rem',
      marginBottom: '15px'
    },
    viewDetailsBtn: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: '2px solid white',
      padding: '10px 20px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
    },
    zodiacGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    zodiacCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '25px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      border: '2px solid transparent'
    },
    zodiacCardMatched: {
      border: '3px solid #ffd700',
      background: 'linear-gradient(45deg, #ffd700, #ffb347)',
      color: 'white',
      animation: 'pulse 2s infinite'
    },
    zodiacSymbol: {
      fontSize: '3rem',
      marginBottom: '15px',
      display: 'block'
    },
    zodiacName: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      margin: 0
    },
    signDetails: {
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    },
    detailsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      paddingBottom: '20px',
      borderBottom: '3px solid #667eea'
    },
    detailsTitle: {
      color: '#2c3e50',
      fontSize: '2.5rem',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: 0
    },
    closeBtn: {
      background: '#e74c3c',
      color: 'white',
      border: 'none',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      fontSize: '1.5rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    detailSection: {
      marginBottom: '30px',
      padding: '20px',
      background: 'rgba(102, 126, 234, 0.05)',
      borderRadius: '15px',
      borderLeft: '5px solid #667eea'
    },
    sectionTitle: {
      color: '#2c3e50',
      fontSize: '1.5rem',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center'
    },
    sectionSubtitle: {
      color: '#34495e',
      fontSize: '1.2rem',
      marginBottom: '10px',
      marginTop: '15px'
    },
    sectionText: {
      lineHeight: '1.6',
      color: '#2c3e50',
      marginBottom: '10px'
    },
    traitsGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '15px'
    },
    traitTag: {
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      color: 'white',
      padding: '8px 15px',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      display: 'inline-block'
    },
    careerList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '15px'
    },
    careerTag: {
      background: '#27ae60',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '15px',
      fontSize: '0.85rem',
      display: 'inline-block'
    },
    healthGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      margin: '20px 0'
    },
    list: {
      listStyle: 'none',
      paddingLeft: '0'
    },
    listItem: {
      padding: '8px 0',
      color: '#2c3e50',
      position: 'relative',
      paddingLeft: '25px'
    },
    basicSignInfo: {
      textAlign: 'center',
      padding: '40px',
      color: '#7f8c8d'
    },
    basicInfoText: {
      fontSize: '1.2rem',
      marginBottom: '15px'
    }
  };

  const getZodiacSign = (day, month) => {
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    
    if (!dayNum || !monthNum) return null;

    for (let sign of zodiacSigns) {
      const [startMonth, startDay, endMonth, endDay] = sign.dates;
      
      if (startMonth === endMonth) {
        if (monthNum === startMonth && dayNum >= startDay && dayNum <= endDay) {
          return sign.name;
        }
      } else {
        if ((monthNum === startMonth && dayNum >= startDay) || 
            (monthNum === endMonth && dayNum <= endDay)) {
          return sign.name;
        }
      }
    }
    return null;
  };

  const handleBirthdayChange = (field, value) => {
    setBirthday(prev => ({ ...prev, [field]: value }));
  };

 const handleSignClick = (signName) => {
  const signKey = signName.toLowerCase();
  const signData = zodiacData[signKey];
  
  if (signData) {
    setSelectedSign(signData);
  } else {
    setSelectedSign({ sign: signName, symbol: zodiacSigns.find(s => s.name === signName)?.symbol });
  }
};

  const matchedSign = getZodiacSign(birthday.day, birthday.month);

  return (
    <div style={styles.astrologyApp}>
      <header style={styles.appHeader}>
        <h1 style={styles.appTitle}>✨ Astrology Signs Explorer ✨</h1>
        <p style={styles.appSubtitle}>Discover your zodiac sign and personality traits</p>
      </header>

      <div style={styles.birthdaySection}>
        <h2 style={styles.birthdayTitle}>Enter Your Birthday</h2>
        <div style={styles.birthdayInputs}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Day</label>
            <input
              style={styles.inputField}
              type="number"
              min="1"
              max="31"
              value={birthday.day}
              onChange={(e) => handleBirthdayChange('day', e.target.value)}
              placeholder="DD"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Month</label>
            <input
              style={styles.inputField}
              type="number"
              min="1"
              max="12"
              value={birthday.month}
              onChange={(e) => handleBirthdayChange('month', e.target.value)}
              placeholder="MM"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Year</label>
            <input
              style={styles.inputField}
              type="number"
              min="1900"
              max="2025"
              value={birthday.year}
              onChange={(e) => handleBirthdayChange('year', e.target.value)}
              placeholder="YYYY"
            />
          </div>
        </div>
        {matchedSign && (
          <div style={styles.matchedSign}>
            <p style={styles.matchedText}>Your zodiac sign is: <strong>{matchedSign}</strong></p>
            <button 
              style={styles.viewDetailsBtn}
              onClick={() => handleSignClick(matchedSign)}
              onMouseOver={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#667eea';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.color = 'white';
              }}
            >
              View Details
            </button>
          </div>
        )}
      </div>

      <div style={styles.zodiacGrid}>
        {zodiacSigns.map((sign) => (
          <div
            key={sign.name}
            style={{
              ...styles.zodiacCard,
              ...(matchedSign === sign.name ? styles.zodiacCardMatched : {})
            }}
            onClick={() => handleSignClick(sign.name)}
            onMouseOver={(e) => {
              if (matchedSign !== sign.name) {
                e.target.style.transform = 'translateY(-10px) scale(1.05)';
                e.target.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                e.target.style.color = 'white';
              }
            }}
            onMouseOut={(e) => {
              if (matchedSign !== sign.name) {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                e.target.style.color = '#000';
              }
            }}
          >
            <div style={styles.zodiacSymbol}>{sign.symbol}</div>
            <h3 style={styles.zodiacName}>{sign.name}</h3>
          </div>
        ))}
      </div>

      {selectedSign && (
        <div style={styles.signDetails}>
          <div style={styles.detailsHeader}>
            <h2 style={styles.detailsTitle}>{selectedSign.symbol} {selectedSign.sign}</h2>
            <button 
              style={styles.closeBtn}
              onClick={() => setSelectedSign(null)}
              onMouseOver={(e) => {
                e.target.style.background = '#c0392b';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#e74c3c';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>
          </div>
          
        {selectedSign && selectedSign.personality ? (
            <div>
              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Basic Info</h3>
                <p style={styles.sectionText}><strong>Element:</strong> {selectedSign.element}</p>
                <p style={styles.sectionText}><strong>Quality:</strong> {selectedSign.quality}</p>
                <p style={styles.sectionText}><strong>Ruling Planet:</strong> {selectedSign.rulingPlanet}</p>
                <p style={styles.sectionText}><strong>Dates:</strong> {selectedSign.dates}</p>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Personality Overview</h3>
                <p style={styles.sectionText}>{selectedSign.personality.overview}</p>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Core Traits</h3>
                <div style={styles.traitsGrid}>
                  {selectedSign.personality.coreTraits.map((trait, index) => (
                    <span key={index} style={styles.traitTag}>{trait}</span>
                  ))}
                </div>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Strengths</h3>
                <ul style={styles.list}>
                  {selectedSign.personality.strengths.map((strength, index) => (
                    <li key={index} style={{...styles.listItem, '::before': {content: '🌟'}}}> 
                      🌟 {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Challenges</h3>
                <ul style={styles.list}>
                  {selectedSign.personality.weaknesses.map((weakness, index) => (
                    <li key={index} style={{...styles.listItem, '::before': {content: '🌟'}}}>
                      🌟 {weakness}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Career Paths</h3>
                <p style={styles.sectionText}><strong>Work Style:</strong> {selectedSign.careers.workStyle}</p>
                <div style={styles.careerList}>
                  {selectedSign.careers.idealOccupations.map((career, index) => (
                    <span key={index} style={styles.careerTag}>{career}</span>
                  ))}
                </div>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Relationships</h3>
                <p style={styles.sectionText}><strong>Love Style:</strong> {selectedSign.relationships.loveStyle}</p>
                <p style={styles.sectionText}><strong>Best Matches:</strong> {selectedSign.relationships.bestMatches.join(', ')}</p>
                <p style={styles.sectionText}><strong>Challenging Matches:</strong> {selectedSign.relationships.challenging.join(', ')}</p>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Health & Wellness</h3>
                <div style={styles.healthGrid}>
                  <div>
                    <h4 style={styles.sectionSubtitle}>Strengths</h4>
                    <ul style={styles.list}>
                      {selectedSign.health.strengths.map((strength, index) => (
                        <li key={index} style={styles.listItem}>
                          🌟 {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={styles.sectionSubtitle}>Vulnerabilities</h4>
                    <ul style={styles.list}>
                      {selectedSign.health.vulnerabilities.map((vulnerability, index) => (
                        <li key={index} style={styles.listItem}>
                          🌟 {vulnerability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 style={styles.sectionSubtitle}>Recommendations</h4>
                  <ul style={styles.list}>
                    {selectedSign.health.recommendations.map((rec, index) => (
                      <li key={index} style={styles.listItem}>
                        🌟 {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.basicSignInfo}>
              <p style={styles.basicInfoText}>Detailed information available for Pisces only.</p>
              <p style={styles.basicInfoText}>Click on Pisces to see full personality profile!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllTogether