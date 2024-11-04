import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Track selected index for navigation

  const GITHUB_TOKEN = "YOUR_GITHUB_TOKEN"; // Replace with your GitHub token

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 0) {
        try {
          const response = await axios.get(`https://api.github.com/search/users?q=${query}`, {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`
            }
          });
          setSuggestions(response.data.items || []);
          setShowSuggestions(true);
          setSelectedIndex(-1); // Reset index when new suggestions are loaded
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300); // Debounce API call by 300ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = (username) => {
    setQuery(username);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleClick(suggestions[selectedIndex].login);
    }
  };

  return (
    <div className="autocomplete" style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <input
        type="text"
        placeholder="Search GitHub users..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />
      {showSuggestions && query && (
        <ul className="suggestions" style={{ listStyleType: "none", padding: 0, marginTop: "10px", border: "1px solid #ccc", borderRadius: "4px" }}>
          {suggestions.length ? (
            suggestions.map((user, index) => (
              <li
                key={user.id}
                onClick={() => handleClick(user.login)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  backgroundColor: index === selectedIndex ? "#e6e6e6" : "transparent"
                }}
              >
                {user.login}
              </li>
            ))
          ) : (
            <li style={{ padding: "10px" }}>No suggestions available</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default App;
