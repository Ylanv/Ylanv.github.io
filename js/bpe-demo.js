document.getElementById('run-bpe').addEventListener('click', () => {
    const text = document.getElementById('input-text').value;
    const vocabSize = parseInt(document.getElementById('vocab-size').value, 10);
    
    function bytePairEncoding(text, vocabSize) {
        const vocab = {};
        [...text].forEach(char => vocab[char] = (vocab[char] || 0) + 1);
        
        while (Object.keys(vocab).length < vocabSize) {
            const pairs = {};
            const words = text.split(/\s+/);
            words.forEach(word => {
                for (let i = 0; i < word.length - 1; i++) {
                    const pair = word[i] + word[i + 1];
                    pairs[pair] = (pairs[pair] || 0) + 1;
                }
            });

            const mostCommon = Object.keys(pairs).reduce((a, b) => pairs[a] > pairs[b] ? a : b);
            const regex = new RegExp(mostCommon, 'g');
            text = text.replace(regex, mostCommon);
            vocab[mostCommon] = (vocab[mostCommon] || 0) + 1;
        }
        return text;
    }

    const result = bytePairEncoding(text, vocabSize);
    document.getElementById('output').textContent = result;
});
