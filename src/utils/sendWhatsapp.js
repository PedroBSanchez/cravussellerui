const sendWhatsapp = (number, content) => {
  // Create content message
  // https://wa.me/number/?text=urlencodedtext

  window.location.replace(`https://wa.me/${number}/?text=${content}`);
};

export { sendWhatsapp };
