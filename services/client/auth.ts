export async function login(password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
    },
    body: JSON.stringify({ password }),
  });

  return res.json().then((response) => response);
}

export async function logOut() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, {
    method: 'DELETE',
  });

  return res.json().then((response) => response);
}
