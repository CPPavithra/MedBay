import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HelpProfile = () => {
  const { id } = useParams(); // Get the email from the route
  const [profile, setProfile] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");
  console.log("🚀 HelpProfile ID:", id); 
  useEffect(() => {
    const fetchProfileAndAlerts = async () => {
      try {
        // Step 1: Fetch Help User Profile
        const profileResponse = await axios.get(`http://localhost:3000/helpprofile/${id}`);
        const userProfile = profileResponse.data.help_profile;
        setProfile(userProfile);

        // Step 2: Fetch Alerts Matching Help Type
        if (userProfile?.helptype) {
          const alertsResponse = await axios.get(`http://localhost:3000/alerts?type=${userProfile.helptype}`);
          setAlerts(alertsResponse.data.alerts);
        }
      } catch (err) {
        setError("Error fetching data. Please try again.");
      }
    };

    fetchProfileAndAlerts();
  }, [id]);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Help User Profile</h1>
      {error && <p className="error-message">{error}</p>}
      
      {profile ? (
        <div className="profile-card">
          <h2>{profile.name}</h2>
          <p><strong>Help Type:</strong> {profile.helptype}</p>
        </div>
      ) : (
        !error && <p>Loading profile...</p>
      )}

      <h2>Matching Alerts</h2>
      <div className="alert-list">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <div key={index} className="alert-card">
              <h2>{alert.type}</h2>
              <p>{alert.location}</p>
              <p>{alert.details}</p>
            </div>
          ))
        ) : (
          <p>No alerts available for this help type.</p>
        )}
      </div>
    </div>
  );
};

export default HelpProfile;

