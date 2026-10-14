// Gestione iscrizione lista d'attesa SuDiTe
// Salva l'email in Wix Contacts tramite API pubblica

async function subscribeEmail(email) {
  const siteId = 'f597d2f4-bcdd-462a-9f9d-e6574c4a512c';
  
  try {
    const res = await fetch(
      `https://www.wixapis.com/contacts/v4/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'wix-site-id': siteId
        },
        body: JSON.stringify({
          info: {
            emails: { items: [{ email, tag: 'UNTAGGED' }] },
            extendedFields: {
              items: {
                'custom.source': { value: 'coming-soon-page' }
              }
            }
          }
        })
      }
    );
    return res.ok || res.status === 409; // 409 = già esistente, va bene
  } catch(e) {
    return false;
  }
}
