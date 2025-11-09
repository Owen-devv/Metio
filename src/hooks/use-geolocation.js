import { useEffect, useState } from "react";

export function useGeolocation() {
    const [locationData, setLocationData] = useState({
        coordinates: null,
        error: null,
        isLoading: true
    })

    const getLocation = () => {
        setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: "Trình duyệt không hỗ trợ Geolocation",
                isLoading: false
            });
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                error: null,
                isLoading: false
            })
        }, (error) => {
            let errorMessage;

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "Người dùng đã từ chối yêu cầu Định vị địa lý"
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Thông tin vị trí không có sẵn"
                    break;
                case error.TIMEOUT:
                    errorMessage = "Yêu cầu lấy vị trí người dùng đã hết hạn"
                    break;
                default:
                    errorMessage = "Lỗi không xác định"
                    break;
            }

            setLocationData({
                coordinates: null,
                error: errorMessage,
                isLoading: false
            })
        },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        )
    }

    useEffect(() => {
        getLocation();
    }, []);

    return {
        ...locationData,
        getLocation
    }
}