export async function conntactForm(form: {
    name: string,
    email: string,
    message: string
}) {
    //Should be deleted
  console.log("Contacts post:", process.env.NEXT_PUBLIC_BASE_URL)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
    },
    body: JSON.stringify(form),
  });

  return res.json().then((response) => response);
}
