class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Project Title';
        const imgSrc = this.getAttribute('image') || 'placeholder.png';
        const imgAlt = this.getAttribute('alt') || 'Project image';
        const description = this.getAttribute('description') || 'Project description';
        const link = this.getAttribute('link') || '#';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    background-color: color-mix(in srgb, var(--secondary-color) 90%, white 10%);
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 2rem;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease-in-out;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }
                h2 {
                    color: var(--primary-color);
                    font-size: 1.5rem;
                }
                picture img {
                    width: 300px;
                    height: auto;
                    display: block;
                    border-radius: 10px;
                    margin: 0.5rem 0;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s ease-in-out;
                }
                picture img:hover {
                    transform: scale(1.05);
                }
                p {
                    font-size: 1rem;
                    line-height: 1.5;
                    color: #333;
                }
                a {
                    display: inline-block;
                    color: blue;
                    text-decoration: none;
                    font-weight: bold;
                    margin-top: 8px;
                }
                a:hover {
                    text-decoration: underline;
                }
                @media (max-width: 768px) {
                    :host {
                        padding: 1rem;
                    }
                    picture img {
                        width: 80%;
                    }
                }
            </style>
            <h2>${title}</h2>
            <picture>
                <img src="${imgSrc}" alt="${imgAlt}">
            </picture>
            <p>${description}</p>
            <a href="${link}" target="_blank">Read More about the Game!</a>
        `;
    }
}

customElements.define('project-card', ProjectCard);