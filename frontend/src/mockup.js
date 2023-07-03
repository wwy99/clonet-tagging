// Mock function for user sign-up
const signUpUser = async (email, username, password) => {
    // Simulate server processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Simulate successful sign-up
    return { success: true };
  };
  
  // Mock function for user login
  const loginUser = async (email, password) => {
    // Simulate server processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Simulate successful login
    return { success: true };
  };
  
  // Mock function for user logout
  const logoutUser = async () => {
    // Simulate server processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Simulate successful logout
    return { success: true };
  };
  