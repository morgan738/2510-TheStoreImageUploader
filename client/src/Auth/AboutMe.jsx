const AboutMe = ({ user, logout }) => {
  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AboutMe;
