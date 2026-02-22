import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Star, Moon, Sun, BookOpen, Users, Sparkles } from 'lucide-react';
import './Learn.css';

const Learn = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [expandedSubsections, setExpandedSubsections] = useState({});
  const [learnData, setLearnData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.BASE_URL}learn.json`);
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
      return <p className="learn-text">{content}</p>;
    }

    return Object.entries(content).map(([key, value]) => {
      const isExpanded = expandedSubsections[key];
      const hasNested = typeof value === 'object' && value !== null;

      return (
        <div key={key} className={level > 0 ? 'learn-subsection-nested' : 'learn-subsection'}>
          {hasNested ? (
            <div>
              <button
                onClick={() => toggleSubsection(key)}
                className="learn-subsection-button"
              >
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
                {level === 0 ? (
                  <span className="learn-subsection-title">{key.replace(/_/g, ' ')}</span>
                ) : (
                  <span className="learn-subsection-title-nested">{key.replace(/_/g, ' ')}</span>
                )}
              </button>
              {isExpanded && (
                <div className="learn-expanded-content">
                  {renderContent(value, level + 1)}
                </div>
              )}
            </div>
          ) : (
            <div className="learn-leaf">
              <h4 className="learn-leaf-title">{key.replace(/_/g, ' ')}</h4>
              <p className="learn-leaf-text">{value}</p>
            </div>
          )}
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className="learn-page">
        <div className="learn-state">
          <div className="learn-state-content">
            <Moon size={64} className="learn-pulse" />
            <p>Loading astrology data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="learn-page">
        <div className="learn-state">
          <div className="learn-state-content">
            <p className="learn-error">Error loading data: {error}</p>
            <p>Please make sure learn.json is in your public folder.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!learnData) {
    return (
      <div className="learn-page">
        <div className="learn-state">
          <div className="learn-state-content">
            <p>No data available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="learn-page">
      <div className="learn-header">
        <h1 className="learn-title">Learn Astrology</h1>
        <p className="learn-subtitle">Comprehensive Guide to Astrological Knowledge</p>
      </div>

      <div className="learn-layout">
        {/* Table of Contents */}
        <div className="learn-sidebar">
          <div className="learn-toc">
            <h2 className="learn-toc-title">Contents</h2>
            <div className="learn-toc-list">
              {learnData.table_of_contents?.map((item) => {
                const Icon = getIcon(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSection(item.id)}
                    className={`learn-toc-button ${selectedSection === item.id ? 'active' : ''}`}
                  >
                    <Icon size={20} className="learn-toc-icon" />
                    <div className="learn-toc-info">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="learn-content-area">
          <div className="learn-content-card">
            {selectedSection ? (
              <div>
                <div className="learn-chapter-header">
                  {React.createElement(getIcon(selectedSection), { size: 32 })}
                  <h2 className="learn-chapter-title">
                    {learnData.chapters?.[selectedSection]?.title}
                  </h2>
                </div>
                <div>
                  {learnData.chapters?.[selectedSection]?.content &&
                    renderContent(learnData.chapters[selectedSection].content)}
                </div>
              </div>
            ) : (
              <div className="learn-welcome">
                <Moon size={96} />
                <h3>Welcome to Your Astrology Journey</h3>
                <p>Select a topic from the menu to begin exploring the fascinating world of astrology.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
