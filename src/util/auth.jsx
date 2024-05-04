export async function requireAuth() {
  const url = process.env.REACT_APP_AUTH0_REDIRECT_URI;
  const storedData = localStorage.getItem("signin");
  //const navigate = useNavigate();
  if (!storedData) {
    alert("you must login first");
    localStorage.clear();
    window.location.href = `${url}`;
  }
  return null;
}
