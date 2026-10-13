// Centralized mock state using localStorage for multi-page synchronization
const DEFAULT_SERVICES = [
    { id: 'gen', name: 'General Inquiry', prefix: 'A', avgTime: 3 },
    { id: 'bill', name: 'Billing & Payments', prefix: 'B', avgTime: 4 },
    { id: 'doc', name: 'Document Verification', prefix: 'C', avgTime: 6 },
    { id: 'cons', name: 'Advisory Consultation', prefix: 'D', avgTime: 8 }
];

const DEFAULT_COUNTERS = [
    { id: 1, name: 'Counter 1', status: 'open', currentToken: null, assignedService: 'gen' },
    { id: 2, name: 'Counter 2', status: 'open', currentToken: null, assignedService: 'bill' },
    { id: 3, name: 'Counter 3', status: 'closed', currentToken: null, assignedService: 'doc' },
    { id: 4, name: 'Counter 4', status: 'closed', currentToken: null, assignedService: 'cons' }
];

// Getters and Setters for LocalStorage Synchronization
function getStoredData(key, defaultVal) {
    const data = localStorage.getItem(`queueflow_${key}`);
    return data ? JSON.parse(data) : defaultVal;
}

function setStoredData(key, val) {
    localStorage.setItem(`queueflow_${key}`, JSON.stringify(val));
}

function getQueue() { return getStoredData('queue', []); }
function setQueue(q) { setStoredData('queue', q); }

function getCounters() { return getStoredData('counters', DEFAULT_COUNTERS); }
function setCounters(c) { setStoredData('counters', c); }

function getCompletedCount() { return getStoredData('completed', 48); }
function setCompletedCount(n) { setStoredData('completed', n); }

function getCounterAuth() { return getStoredData('auth', false); }
function setCounterAuth(status) { setStoredData('auth', status); }