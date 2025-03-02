async function subscribeToPremium(userId) {
    const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    });

    const data = await response.json();
    
    const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: data.amount,
        currency: "INR",
        name: "VideoDownloadApp",
        description: "Unlock unlimited downloads",
        order_id: data.id,
        handler: async function (response) {
            await fetch("/api/payment/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, paymentId: response.razorpay_payment_id }),
            });
            alert("Payment successful! You are now a premium user.");
        },
    };

    const rzp = new Razorpay(options);
    rzp.open();
}
