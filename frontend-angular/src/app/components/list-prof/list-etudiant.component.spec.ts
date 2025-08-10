// /* Animations personnalisées */
// @keyframes fadeIn {
//   from {
//     opacity: 0;
//     transform: translateY(10px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// @keyframes slideUp {
//   from {
//     transform: translateY(20px);
//     opacity: 0;
//   }
//   to {
//     transform: translateY(0);
//     opacity: 1;
//   }
// }

// @keyframes pulse {
//   0%, 100% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.05);
//   }
// }

// @keyframes shake {
//   0%, 100% { transform: translateX(0); }
//   25% { transform: translateX(-2px); }
//   75% { transform: translateX(2px); }
// }

// /* Classes d'animation */
// .fade-in {
//   animation: fadeIn 0.5s ease-in-out;
// }

// .slide-up {
//   animation: slideUp 0.3s ease-out;
// }

// .pulse-animation {
//   animation: pulse 2s infinite;
// }

// .shake-animation {
//   animation: shake 0.5s ease-in-out;
// }

// /* Styles pour le tableau responsive */
// .table-container {
//   max-width: 100%;
//   overflow-x: auto;
// }

// /* Animations au survol des lignes du tableau */
// tbody tr {
//   transition: all 0.2s ease-in-out;
// }

// tbody tr:hover {
//   transform: translateY(-1px);
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// }

// /* Styles pour les boutons d'action */
// .action-button {
//   transition: all 0.2s ease-in-out;
// }

// .action-button:hover {
//   transform: scale(1.1);
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// }

// .action-button:active {
//   transform: scale(0.95);
// }

// /* Animation pour les cards de stats */
// .stats-card {
//   transition: all 0.3s ease-in-out;
//   position: relative;
//   overflow: hidden;
// }

// .stats-card::before {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: -100%;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
//   transition: left 0.5s;
// }

// .stats-card:hover::before {
//   left: 100%;
// }

// .stats-card:hover {
//   transform: translateY(-2px);
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
// }

// /* Loading spinner personnalisé */
// .loading-spinner {
//   border: 4px solid #f3f4f6;
//   border-top: 4px solid #10b981;
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   animation: spin 1s linear infinite;
// }

// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }

// /* Styles pour les badges */
// .badge {
//   transition: all 0.2s ease-in-out;
// }

// .badge:hover {
//   transform: scale(1.05);
// }

// /* Animation d'entrée pour les notifications */
// .notification-enter {
//   animation: slideInRight 0.3s ease-out;
// }

// @keyframes slideInRight {
//   from {
//     transform: translateX(100%);
//     opacity: 0;
//   }
//   to {
//     transform: translateX(0);
//     opacity: 1;
//   }
// }

// /* Styles pour les champs de recherche et filtres */
// .search-input {
//   transition: all 0.2s ease-in-out;
// }

// .search-input:focus {
//   box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
//   border-color: #10b981;
// }

// .filter-select {
//   transition: all 0.2s ease-in-out;
// }

// .filter-select:focus {
//   box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
//   border-color: #10b981;
// }

// /* Styles pour les avatars */
// .avatar {
//   transition: all 0.2s ease-in-out;
// }

// .avatar:hover {
//   transform: scale(1.1);
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
// }

// /* Animation pour les éléments vides */
// .empty-state {
//   animation: fadeIn 0.5s ease-in-out;
// }

// /* Responsive breakpoints personnalisés */
// @media (max-width: 768px) {
//   .responsive-table {
//     font-size: 0.875rem;
//   }
  
//   .responsive-padding {
//     padding-left: 1rem;
//     padding-right: 1rem;
//   }
  
//   .mobile-stack {
//     flex-direction: column;
//     gap: 1rem;
//   }
// }

// @media (max-width: 640px) {
//   .mobile-hide {
//     display: none;
//   }
  
//   .mobile-full-width {
//     width: 100%;
//   }
// }

// /* Styles pour les états de focus accessibles */
// .focus-visible:focus {
//   outline: 2px solid #10b981;
//   outline-offset: 2px;
// }

// /* Animation de chargement pour les données */
// .skeleton {
//   background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//   background-size: 200% 100%;
//   animation: loading 1.5s infinite;
// }

// @keyframes loading {
//   0% {
//     background-position: 200% 0;
//   }
//   100% {
//     background-position: -200% 0;
//   }
// }

// /* Styles pour les modals (si nécessaire) */
// .modal-overlay {
//   backdrop-filter: blur(4px);
//   animation: fadeIn 0.2s ease-out;
// }

// .modal-content {
//   animation: slideUp 0.3s ease-out;
// }

// /* Styles pour les tooltips */
// .tooltip {
//   position: relative;
// }

// .tooltip:hover::after {
//   content: attr(data-tooltip);
//   position: absolute;
//   bottom: 100%;
//   left: 50%;
//   transform: translateX(-50%);
//   background: #374151;
//   color: white;
//   padding: 0.5rem;
//   border-radius: 0.375rem;
//   font-size: 0.875rem;
//   white-space: nowrap;
//   z-index: 50;
//   animation: fadeIn 0.2s ease-out;
// }

// .tooltip:hover::before {
//   content: '';
//   position: absolute;
//   bottom: 100%;
//   left: 50%;
//   transform: translateX(-50%) translateY(1px);
//   border: 4px solid transparent;
//   border-top-color: #374151;
//   z-index: 50;
// }