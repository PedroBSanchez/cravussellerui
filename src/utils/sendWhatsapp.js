const sendWhatsapp = (number, content) => {
  // Create content message
  // https://wa.me/number/?text=urlencodedtext

  window.open(`https://wa.me/${number}/?text=${content}`, "_blank");
};

export { sendWhatsapp };
