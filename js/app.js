/**
==========================================
 * 
 * A real-time analytics dashboard with:
 * - Live updating KPI cards
 * - Dynamic bar chart
 * - Activity feed
 * - Transaction table
 * 
 * @version 1.0.0
 * @author Your Name
 * @license MIT
 */

const app = Vue.createApp({

    data() {
        return {
            visitors: 12453,
            conversion: 8.2,
            bounce: 34.6,
            revenue: 28490,
            
            prevVisitors: 12453,
            prevConversion: 8.2,
            prevBounce: 34.6,
            prevRevenue: 28490,
            
            chartData: [
                { label: 'M', value: 45 },
                { label: 'T', value: 70 },
                { label: 'W', value: 55 },
                { label: 'T', value: 85 },
                { label: 'F', value: 65 },
                { label: 'S', value: 90 },
                { label: 'S', value: 40 }
            ],
            
            activities: [
                { id: 1, icon: 'fas fa-user-plus', title: 'New Sign-up', desc: 'alex@email.com', time: 'now' },
                { id: 2, icon: 'fas fa-shopping-cart', title: 'Purchase', desc: 'Pro Plan', time: '1m' },
                { id: 3, icon: 'fas fa-rocket', title: 'Traffic Spike', desc: '+23% visitors', time: '5m' },
                { id: 4, icon: 'fas fa-star', title: 'Review', desc: '5 stars ⭐', time: '8m' }
            ],
            
            transactions: [
                { id: 1, user: 'Emma Wilson', plan: 'Pro', amount: 49, status: 'Completed', statusClass: 'completed' },
                { id: 2, user: 'James Rodriguez', plan: 'Basic', amount: 19, status: 'Pending', statusClass: 'pending' },
                { id: 3, user: 'Sophia Lee', plan: 'Enterprise', amount: 149, status: 'Completed', statusClass: 'completed' },
                { id: 4, user: 'Liam Chen', plan: 'Pro', amount: 49, status: 'Refunded', statusClass: 'refunded' }
            ],
            
            currentTime: '',
            statusText: 'Connected',
            connected: true
        };
    },
    
    computed: {
        /**
         * @returns {string} 
         */
        changeVisitors() {
            return ((this.visitors - this.prevVisitors) / this.prevVisitors * 100).toFixed(1);
        },
        
        /**
         * @returns {string} 
         */
        conversionChange() {
            return ((this.conversion - this.prevConversion) / this.prevConversion * 100).toFixed(1);
        },
        
        /**
         * @returns {string} 
         */
        bounceChange() {
            return ((this.bounce - this.prevBounce) / this.prevBounce * 100).toFixed(1);
        },
        
        /**
         * @returns {string} 
         */
        changeRevenue() {
            return ((this.revenue - this.prevRevenue) / this.prevRevenue * 100).toFixed(1);
        }
    },
    

    mounted() {
        this.updateClock();
        
        setInterval(this.updateClock, 1000);
        
        setInterval(this.updateData, 3000);
        
        console.log('✅ Monochrome Dashboard initialized');
    },
    
 
    methods: {
     
        updateClock() {
            const now = new Date();
            this.currentTime = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        },
        

        updateData() {
            this.prevVisitors = this.visitors;
            this.prevConversion = this.conversion;
            this.prevBounce = this.bounce;
            this.prevRevenue = this.revenue;
            
            this.visitors = Math.max(8000, this.visitors + Math.floor((Math.random() - 0.4) * 200));
            this.conversion = Math.min(15, Math.max(3, this.conversion + (Math.random() - 0.5) * 0.8));
            this.bounce = Math.min(60, Math.max(20, this.bounce + (Math.random() - 0.5) * 1));
            this.revenue = Math.max(15000, this.revenue + Math.floor((Math.random() - 0.3) * 500));
            
            this.chartData = this.chartData.map(day => ({
                ...day,
                value: Math.min(95, Math.max(20, day.value + (Math.random() - 0.4) * 20))
            }));
            
            const actions = [
                { title: 'Purchase', icon: 'fa-shopping-cart', desc: 'Pro Plan' },
                { title: 'Login', icon: 'fa-sign-in-alt', desc: 'User logged in' },
                { title: 'Sign-up', icon: 'fa-user-plus', desc: 'New account created' },
                { title: 'Review', icon: 'fa-star', desc: '5 star rating' },
                { title: 'Share', icon: 'fa-share-alt', desc: 'Shared dashboard' },
                { title: 'Export', icon: 'fa-download', desc: 'Report exported' }
            ];
            
            const random = actions[Math.floor(Math.random() * actions.length)];
            this.activities.unshift({
                id: Date.now(),
                icon: 'fas ' + random.icon,
                title: random.title,
                desc: random.desc,
                time: 'now'
            });
            
            if (this.activities.length > 8) {
                this.activities.pop();
            }

            const statuses = ['Completed', 'Pending', 'Refunded'];
            const classes = { 
                'Completed': 'completed', 
                'Pending': 'pending', 
                'Refunded': 'refunded' 
            };
            
            this.transactions = this.transactions.map(t => {
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                return {
                    ...t,
                    amount: Math.floor(20 + Math.random() * 150),
                    status: newStatus,
                    statusClass: classes[newStatus]
                };
            });
            
            this.connected = Math.random() > 0.95 ? false : true;
            this.statusText = this.connected ? 'Connected' : 'Reconnecting...';
        }
    }
});

app.mount('#app');