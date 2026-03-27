function generatePDF() {
    const form = document.querySelector('form');
    const clone = form.cloneNode(true);

    // Lisa eraldi klass PDF-iks
    clone.classList.add('pdf-clone');

    // Eemalda kõik nupud kloonist
    const buttons = clone.querySelectorAll('button');
    buttons.forEach(btn => btn.remove());

    // Eemalda ID-d, et vältida duplikaate
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));

    // Paki nähtamatult wrapperisse
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.top = '-9999px';
    wrapper.style.left = '-9999px';
    wrapper.style.visibility = 'hidden';
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    const opt = {
        margin: 1,
        filename: 'dokument.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale:2},
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(clone).set(opt).save().then(() => {
        // Korista pärast
        document.body.removeChild(wrapper);
    });
}