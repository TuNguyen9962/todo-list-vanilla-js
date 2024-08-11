function generateUID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }
  
  const uid = generateUID();
  console.log(uid); // Example: "lg5f5h1ui8x"