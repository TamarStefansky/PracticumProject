import { observable, action, makeObservable, runInAction } from 'mobx';
import axios from "axios";

class WorkerSingleTon {

    workersList = [];
    tempList = [];
    constructor() {
        makeObservable(this, {
            workersList: observable,
            getWorkersList: action,
            putWorker: action,
            deleteWorker: action,
            postWorker: action
        })
        this.init();
    }
    init() {
        this.getWorkersList();
    }

    getWorkersList() {
        axios.get(`https://localhost:7148/api/Worker`).then((result) => {
            runInAction(() => {
                this.tempList = result.data;
                this.workersList = this.tempList.filter(worker => worker.isActive === true);
            }
            )
        }).catch((error) => {
            console.log(error);
        })
    }

    postWorker(workerToAdd) {
        fetch(`https://localhost:7148/api/Worker`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workerToAdd)
        }).then((res) => {
            if (res.status === 200) {
                runInAction(() => {
                    this.workersList.push(res.data);
                    console.log("Worker was added successfully");
                });
            } else {
                console.error("Worker was not added. Unexpected status:", res.status);
            }
        }).catch((error) => {
            console.error("Error adding worker:", error);

        });
    }

    putWorker(id, updatedWorker) {
        console.log("updatedWorker: ")
        console.log(updatedWorker);
        fetch(`https://localhost:7148/api/Worker/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedWorker)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to update worker');
            }
            console.log('Worker updated successfully.');
            const index = this.workersList.findIndex(worker => worker.id === id);
            if (index !== -1) {
                this.workersList[index] = updatedWorker;
                this.workersList[index].id = id;
                this.workersList = [...this.workersList]
            }
        })
            .catch(error => {
                console.error('Error updating worker:', error);
            });
    }

    deleteWorker(id) {
        const index = this.workersList.findIndex(worker => worker.id === id);
        try {
            const response = axios.delete(`https://localhost:7148/api/Worker/${id}`);
            console.log("isActive = false");
        } catch (error) {
            console.log(error);
        }
    }
}

export default new WorkerSingleTon();