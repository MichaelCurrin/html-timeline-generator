import htm from 'https://unpkg.com/htm?module';
import {
    Component,
    h,
    render
} from 'https://unpkg.com/preact?module';

const html = htm.bind(h);

function parseEvents(eventsStr) {
    return eventsStr.split("\n")
        .map(i => {
            const pieces = i.split(" | ")
                .map(i => i.trim())

            if (pieces.length !== 2) {
                console.log(`Expected 2 items, got: ${i}`)
                return {}
            }

            return {
                date: pieces[0],
                title: pieces[1]
            }
        })
}

function formatItem(value, index) {
    const position = index % 2 === 0 ? 'left' : 'right'

    return html`
            <div class="container ${position}">
                <div class="content">
                    <h2>${value.date}</h2>

                    <p>
                        ${value.title}
                    </p>
                </div>
            </div>
        `
}

function Results(props) {
    const timelineItems = props.events.map(formatItem)

    return html`
        <div class="timeline">
            ${timelineItems}
        </div>`
}

class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ''
        };
    }

    changeHandler = (event) => {
        this.setState({
            items: event.target.value
        });
    }

    render() {
        const events = parseEvents(this.state.items)

        const value = html`\
2021 Jan | Happy new year<br/>
2020 Dec | Christmas<br/>
2020 Mar | Lockdown<br/>
2020 Mar | Covid<br/>
2020 Jan | Optmism<br/>
        `

        return (
            html`
                <p>${value}</p>

                <form action="#">
                    <textarea rows="4" cols="50"
                        onKeyUp=${this.changeHandler}
                    />
                </form>

                <div>
                    <${Results} events=${events} />
                </div>`
        );
    }
}

function App() {
    return html`
        <header>
            <h1>Timeline</h1>
        </header>

        <section>
            <${TimeLine} />
        </section>
    `;
}

render(html`<${App}/>`, document.body);
