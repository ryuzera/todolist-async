interface Repository<T> {
    getAll(sorted: boolean): Promise<T[]>
    getById(id: number): Promise<T>
    inset(item: T): Promise<void>
    delete(id: number): Promise<void>
}

const RA = '11202231732';
    const API_BASE_URL = `https://todo-server-spa-748269297649.southamerica-east1.run.app/api/${RA}`

export interface TodoItem {
    id: number,
    description: string,
    tags?: string[],
    deadline?: string
}

export class TodoRepository implements Repository<TodoItem> {
    async getAll(sorted: boolean): Promise<TodoItem[]> {
        const response = await fetch(API_BASE_URL)

        if(!response.ok) {
            throw new Error(`Failed to fetch todos: ${await response.text()}`)
        }

        const items = (await response.json()).items;

        return items;
    }
}

const repo = new TodoRepository();

async function test() {
    console.log(await repo.getAll());
}

test();