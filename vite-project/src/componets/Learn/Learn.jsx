import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Star, Moon, Sun, BookOpen, Users, Sparkles } from 'lucide-react';

const Learn = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [expandedSubsections, setExpandedSubsections] = useState({});
  const [learnData, setLearnData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load JSON data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Replace 'learn.json' with the actual path to your JSON file
        const response = await fetch('/learn.json');
        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.status}`);
        }
        const data = await response.json();
        setLearnData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error loading learn.json:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleSubsection = (key) => {
    setExpandedSubsections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getIcon = (id) => {
    const icons = {
      beginnings: Star,
      history: BookOpen,
      astrologers: Users,
      signs: Sun,
      myths: Sparkles
    };
    return icons[id] || Star;
  };

  const renderContent = (content, level = 0) => {
    if (typeof content === 'string') {
      return <p className="text-gray-700 leading-relaxed mb-4">{content}</p>;
    }

    return Object.entries(content).map(([key, value]) => {
      const isExpanded = expandedSubsections[key];
      const hasNested = typeof value === 'object' && value !== null;

      return (
        <div key={key} className={`${level > 0 ? 'ml-4' : ''} mb-4`}>
          {hasNested ? (
            <div>
              <button
                onClick={() => toggleSubsection(key)}
                className="flex items-center text-left w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 mr-2 text-purple-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-2 text-purple-600" />
                )}
                <h3 className={`font-semibold capitalize ${level === 0 ? 'text-lg text-purple-800' : 'text-md text-purple-700'}`}>
                  {key.replace(/_/g, ' ')}
                </h3>
              </button>
              {isExpanded && (
                <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                  {renderContent(value, level + 1)}
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <h4 className="font-medium text-purple-700 mb-2 capitalize">{key.replace(/_/g, ' ')}</h4>
              <p className="text-gray-700 leading-relaxed">{value}</p>
            </div>
          )}
        </div>
      );
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Moon className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
            <p className="text-purple-600 text-lg">Loading astrology data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-500 text-lg mb-4">Error loading data: {error}</div>
            <p className="text-gray-600">Please make sure learn.json is in your public folder.</p>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!learnData) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-600">No data available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800 mb-2">✨ Learn Astrology</h1>
        <p className="text-purple-600 text-lg">Comprehensive Guide to Astrological Knowledge</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table of Contents */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">📚 Contents</h2>
            <div className="space-y-3">
              {learnData.table_of_contents?.map((item) => {
                const Icon = getIcon(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSection(item.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedSection === item.id
                        ? 'bg-purple-100 border-2 border-purple-300 shadow-md'
                        : 'bg-gray-50 hover:bg-purple-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`w-5 h-5 mt-1 ${
                        selectedSection === item.id ? 'text-purple-600' : 'text-gray-500'
                      }`} />
                      <div>
                        <h3 className={`font-semibold ${
                          selectedSection === item.id ? 'text-purple-800' : 'text-gray-800'
                        }`}>
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {selectedSection ? (
              <div>
                <div className="flex items-center mb-6">
                  {React.createElement(getIcon(selectedSection), {
                    className: "w-8 h-8 text-purple-600 mr-3"
                  })}
                  <h2 className="text-3xl font-bold text-purple-800">
                    {learnData.chapters?.[selectedSection]?.title}
                  </h2>
                </div>
                <div className="prose prose-purple max-w-none">
                  {learnData.chapters?.[selectedSection]?.content && 
                    renderContent(learnData.chapters[selectedSection].content)}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Moon className="w-24 h-24 text-purple-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-purple-800 mb-2">
                  Welcome to Your Astrology Journey
                </h3>
                <p className="text-purple-600 text-lg">
                  Select a topic from the menu to begin exploring the fascinating world of astrology.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;