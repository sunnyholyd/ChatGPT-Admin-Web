/**
 * Elastice Email sender
 */
const apiKey = process.env.ELASTICE_EMAIL_API_KEY!;
const senderEmail = process.env.ELASTICE_EMAIL_SENDER!;

export default async function sendEmail(to: string, code: string | number) {
  const params = {
    apikey: apiKey,
    from: senderEmail,
    to: to,
    subject: "[ChatGPT-Admin-Web] 激活码",
    bodyHtml: `您的激活码是：${code}`,
  };

  const queryString: string = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`https://api.elasticemail.com/v2/email/send?${queryString}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
    return false;
  }

  // const formData = new FormData();
  // for (const key in params) {
  //   // @ts-ignore
  //   formData.append(key, params[key]);
  // }

  // const response = await fetch("https://api.elasticemail.com/v2/email/send", {
  //   method: "POST",
  //   body: formData,
  // });
  // return response.ok;

}
