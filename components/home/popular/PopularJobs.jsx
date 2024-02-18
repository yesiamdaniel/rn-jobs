import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import useFetch from '../../../hooks/useFetch';

import styles from './popularJobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';

const PopularJobs = () => {
    const router = useRouter();

    const { data, isLoading, error } = useFetch(
        'search',
        {
            query: 'React developers',
            num_pages: 1
        }
    )

    const handleCardPress = (item) => {
        router.push(`/job-details/${item.job_id}`);
        setSelectedJob(item);
    }

    const [selectedJob, setSelectedJob] = useState();

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <PopularJobCard
                                item={item}
                                selectedJob={selectedJob}
                                handleCardPress={handleCardPress}
                            />
                        )}
                        keyExtractor={item => item?.job_id}
                        contentContainerStyle={{ columnGap: SIZES.medium }}
                        horizontal
                    />
                )}
            </View>
        </View>
    )
}

export default PopularJobs