-- Update dataset descriptions with more detailed information

UPDATE datasets 
SET dataset_description = 'Comprehensive lithium-ion battery testing dataset from McMaster University featuring the LG HG2 3Ah cell tested under controlled thermal conditions. The dataset includes detailed charge-discharge cycles at various C-rates, high-precision voltage-current measurements with 0.1% accuracy, thermal behavior analysis, and complete data acquisition scripts. Ideal for battery management system (BMS) development, state-of-charge (SOC) estimation using deep neural networks, capacity fade analysis, and electric vehicle battery research.'
WHERE dataset_id = 6;

UPDATE datasets 
SET dataset_description = 'Extensive safety testing dataset examining thermal runaway behavior in lithium-ion batteries across diverse applications including mobile phones, electric vehicles, and energy storage systems. Features standardized single-side indentation test protocols with high-resolution time-series measurements of cell voltage, compressive load, indenter stroke displacement, and multi-point temperature readings. Includes 100+ battery test records with quantitative thermal runaway severity scores (0-100 scale), complete cell specifications (dimensions, mass, chemistry, SOC, rated capacity), failure mode analysis, and comprehensive calculation schemes for battery safety assessment and risk prediction modeling.'
WHERE dataset_id = 7;

UPDATE datasets 
SET dataset_description = 'Initial release of comprehensive safety testing data for thermal runaway characterization in lithium-ion batteries. This foundational dataset covers mechanical abuse testing across various battery formats and applications. Includes detailed experimental protocols, standardized indentation methodology, time-resolved measurements of electrical and thermal parameters, severity scoring framework, and complete metadata for battery cells tested. Particularly valuable for comparing evolution of battery safety characteristics and establishing baseline safety metrics for newer battery technologies.'
WHERE dataset_id = 8;

UPDATE datasets 
SET dataset_description = 'Extensive collection of battery testing datasets and research resources from the Center for Advanced Life Cycle Engineering (CALCE) at the University of Maryland. Includes aging studies, capacity fade analysis, impedance spectroscopy data, accelerated life testing results, thermal characterization, and battery prognostics research. Features multiple battery chemistries (Li-ion, LFP, NMC, etc.), various stress conditions, long-term cycling data, and comprehensive documentation. Essential resource for battery lifetime prediction, health monitoring algorithm development, and reliability engineering research.'
WHERE dataset_id = 10;
