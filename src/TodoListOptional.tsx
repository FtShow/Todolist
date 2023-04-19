import {FC} from "react";

export const data1 = {
    title: "What to do",
    tasks: [
        {taskId: 1, title: "HTML&CSS2", isDone: true},
        {taskId: 2, title: "JS2", isDone: false}
    ],
    students: [
        'Jago Wormald1',
        'Saul Milne2',
        'Aariz Hester3',
        'Dion Reeve4',
        'Anisa Ortega5',
        'Blade Cisneros6',
        'Malaikah Phelps7',
        'Zeeshan Gallagher8',
        'Isobella Vo9',
        'Rizwan Mathis10',
        'Menaal Leach11',
        'Kian Walton12',
        'Orion Lamb13',
        'Faizah Huynh14',
        'Crystal Vaughan15',
        'Vivien Hickman16',
        'Stuart Lu17',
        'Karol Davison18',
        'Dario Burns19',
        'Chloe Rich20',
        'Martyna Felix',
        'Nida Glass',
        'Maeve Miles',
        'Hasnain Puckett',
        'Ayman Cano',
        'Safwan Perry',
        'Fox Kelly',
        'Louise Barlow',
        'Malaki Mcgill',
        'Leanna Cline',
        'Willard Hodge',
        'Amelia Dorsey',
        'Kiah Porter',
        'Jeanne Daly',
        'Mohsin Armstrong',
        'Laurie Rangel',
        'Princess Tierney',
        'Kasim Kendall',
        'Darryl Cope',
        'Elysha Ray',
        'Liyana Harris',
        'Kashif Blackburn',
        'Atif Zimmerman',
        'Sila Hartley',
        'Ralphie Hebert',
    ]
}
export const data2 =   {
    title: "What to learn",
    tasks: [
        {taskId: 1, title: "HTML&CSS", isDone: true},
        {taskId: 2, title: "JS", isDone: true}
    ],
    students: [
        'Rick Kane',
        'Finnlay Bentley',
        'Samia North',
        'Isaac Morton',
        'Lily-Ann Clifford',
        'Thalia Park',
        'Sapphire Cruz',
        'Cieran Vazquez',
        'Anya Estes',
        'Dominika Field',
        'Rosanna Chung',
        'Safiyah Davey',
        'Ryley Beasley',
        'Kalvin Trejo',
        'Evie-Mae Farrell',
        'Juliet Valencia',
        'Astrid Austin',
        'Lyle Montgomery',
        'Nisha Mora',
        'Kylie Callaghan',
        'Star Wilks',
        'Marissa Colley',
        'Asa Fuller',
        'Leigh Kemp',
        'Avleen Dawson',
        'Sammy Bonilla',
        'Acacia Becker',
        'Coral Shepherd',
        'Melina Molina',
        'Kiran Bailey',
        'Clara Escobar',
        'Alexandru Horn',
        'Brandon-Lee Mercado',
        'Elouise Weston',
        'King Long',
        'Kerri Searle',
        'Kanye Hamer',
        'Elwood Benitez',
        'Mikail Whitaker',
        'Bobby Hardy',
        'Talha Ferry',
        'Priscilla Landry',
        'Olivia-Grace Cain',
        'Kiaan Wallace',
        'Wesley Padilla90',
        'Ella-Grace Wooten91',
        'Kaif Molloy92',
        'Kamal Broadhurst93',
        'Bianca Ferrell94',
        'Micheal Talbot95',
    ]
}
type TodoListOptionalTypeProps = {
    title: string,
    tasks: Array<{
        title: string;
        isDone: boolean;
        taskId: number;
    }>,
    students: Array<string>;
}
export const TodoListOptional: FC<TodoListOptionalTypeProps> = (props) => {
    return (
        <div className='todolistOpt'>
            <h3>{props.title}</h3>
            <div>
                <ul>
                    <li><input type="checkbox"
                               defaultChecked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                    <li><input type="checkbox"
                                defaultChecked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                </ul>
                <ol>
                    {
                        props.students.map((elem, index) => {
                            return <li className="olWithButton"><span>{index + 1}. {elem}</span>
                                <button onClick={() => {
                                    alert(index + 1)
                                }}>X
                                </button>
                            </li>
                        })
                    }
                </ol>
            </div>
        </div>
    )
}